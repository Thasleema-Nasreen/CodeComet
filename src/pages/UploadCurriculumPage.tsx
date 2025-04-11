
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  AlertCircle,
  CheckCircle2,
  File,
  FileText,
  Loader2,
  UploadCloud,
  X,
  LineChart,
  BookOpen,
  Award
} from 'lucide-react';
import { uploadAndAnalyzeCurriculum } from '@/services/api';

const UploadCurriculumPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [processingStage, setProcessingStage] = useState<number>(0);
  const [extractedData, setExtractedData] = useState<any>(null);
  
  const processingStages = [
    "Uploading document...",
    "Extracting text from document...",
    "Identifying skills and topics...",
    "Categorizing content...",
    "Analyzing relevance to job market...",
    "Generating skill profile..."
  ];

  // Check if user is authenticated
  if (!isAuthenticated) {
    navigate('/login');
    return null;
  }

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      validateAndSetFile(selectedFile);
    }
  };

  const validateAndSetFile = (file: File) => {
    // Check file type
    const allowedTypes = ['application/pdf', 'text/plain'];
    if (!allowedTypes.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF or TXT file only.",
        variant: "destructive",
      });
      return;
    }
    
    // Check file size (limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File Too Large",
        description: "File size should be less than 10MB.",
        variant: "destructive",
      });
      return;
    }
    
    setFile(file);
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const simulateProcessing = async () => {
    for (let i = 0; i < processingStages.length; i++) {
      setProcessingStage(i);
      // Each stage takes a random time between 1-2 seconds
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please select a file to upload.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setUploading(true);
      setProcessingStage(0);
      
      // Simulate processing stages
      await simulateProcessing();
      
      // Actual API call
      const result = await uploadAndAnalyzeCurriculum(file);
      setExtractedData(result);
      
      toast({
        title: "Success",
        description: "Your curriculum has been successfully analyzed!",
      });
      
    } catch (error) {
      console.error('Error uploading curriculum:', error);
      toast({
        title: "Upload Failed",
        description: "There was an error uploading your curriculum. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const continueToAnalysis = () => {
    navigate('/skill-gap');
  };

  return (
    <Layout>
      <div className="py-8 px-4 mx-auto max-w-4xl sm:px-6 lg:px-8">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl mb-2">
          Upload Your Curriculum
        </h1>
        <p className="text-gray-600 mb-8">
          Upload your academic curriculum or syllabus to identify skill gaps and get personalized recommendations
        </p>
        
        {!extractedData ? (
          <Card className="mb-8">
            <CardContent className="p-6">
              {/* Upload Area */}
              <div
                className={`border-2 border-dashed rounded-lg p-8 text-center ${
                  isDragging ? 'border-edu-primary bg-edu-light/50' : 'border-gray-300'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                {!file ? (
                  <div className="space-y-4">
                    <div className="mx-auto h-16 w-16 rounded-full bg-edu-light flex items-center justify-center">
                      <UploadCloud className="h-8 w-8 text-edu-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-gray-900">Upload your curriculum</h3>
                      <p className="text-sm text-gray-500 max-w-md mx-auto">
                        Drag and drop your curriculum file (PDF or TXT), or click to browse
                      </p>
                    </div>
                    <div>
                      <Button
                        variant="outline"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        Browse Files
                      </Button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        accept=".pdf,.txt"
                        className="hidden"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="mx-auto h-16 w-16 rounded-full bg-edu-light flex items-center justify-center">
                      <FileText className="h-8 w-8 text-edu-primary" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-lg font-medium text-gray-900">File Selected</h3>
                      <div className="flex items-center justify-center space-x-2">
                        <File className="h-4 w-4" />
                        <span className="text-sm text-gray-900">{file.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={removeFile}
                          className="p-0 h-6 w-6 rounded-full"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                    <div>
                      <Button
                        onClick={handleUpload}
                        disabled={uploading}
                      >
                        {uploading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                          </>
                        ) : (
                          'Upload & Analyze'
                        )}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Processing Status */}
              {uploading && (
                <div className="mt-8 space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Processing Your Curriculum</h3>
                  <div className="space-y-2">
                    {processingStages.map((stage, index) => (
                      <div 
                        key={index}
                        className={`flex items-center p-3 rounded-lg ${
                          processingStage === index 
                            ? 'bg-edu-light text-edu-primary' 
                            : processingStage > index 
                              ? 'bg-green-50 text-green-600' 
                              : 'text-gray-400'
                        }`}
                      >
                        {processingStage === index ? (
                          <Loader2 className="h-5 w-5 mr-3 animate-spin" />
                        ) : processingStage > index ? (
                          <CheckCircle2 className="h-5 w-5 mr-3" />
                        ) : (
                          <div className="h-5 w-5 mr-3" />
                        )}
                        <span className="text-sm">{stage}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>Analysis Complete!</CardTitle>
                <CardDescription>
                  We've successfully analyzed your curriculum and extracted the following skills and topics:
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div className="flex items-center">
                      <CheckCircle2 className="h-6 w-6 text-green-600 mr-3" />
                      <div>
                        <h4 className="font-medium">Analysis Complete</h4>
                        <p className="text-sm text-gray-600">Your curriculum has been successfully processed</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium">Total Skills Identified</div>
                      <div className="text-2xl font-bold">{extractedData.totalSkills}</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-3">Extracted Skills</h4>
                      <div className="space-y-3">
                        {extractedData.categories.map((category: any, index: number) => (
                          <div key={index}>
                            <div className="flex items-center">
                              <div className={`h-2 w-2 rounded-full mr-2 ${
                                category.relevant ? 'bg-green-500' : 'bg-yellow-500'
                              }`} />
                              <h5 className="text-sm font-medium">{category.name}</h5>
                            </div>
                            <div className="ml-4 mt-2 flex flex-wrap gap-2">
                              {category.extracted.map((skill: string, i: number) => (
                                <span 
                                  key={i}
                                  className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded-full"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="border rounded-lg p-4">
                      <h4 className="font-medium mb-3">Analysis Summary</h4>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Relevant Skills</span>
                            <span className="font-medium">{extractedData.relevantSkills}</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: `${(extractedData.relevantSkills / extractedData.totalSkills) * 100}%` }}
                            />
                          </div>
                        </div>
                        
                        <div>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span>Missing Skills (Market Gap)</span>
                            <span className="font-medium">{extractedData.missingSkills}</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-orange-500 rounded-full"
                              style={{ width: `${(extractedData.missingSkills / (extractedData.totalSkills + extractedData.missingSkills)) * 100}%` }}
                            />
                          </div>
                        </div>
                        
                        <div className="bg-yellow-50 p-3 rounded-lg flex items-start">
                          <AlertCircle className="h-5 w-5 text-yellow-600 mr-2 shrink-0 mt-0.5" />
                          <div className="text-sm text-yellow-800">
                            <p className="font-medium">Skill Gap Detected</p>
                            <p className="mt-1">We've identified {extractedData.missingSkills} in-demand skills that aren't covered in your curriculum. Continue to see detailed analysis.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end space-x-4">
                <Button variant="outline" onClick={() => setExtractedData(null)}>
                  Upload Another File
                </Button>
                <Button onClick={continueToAnalysis}>
                  Continue to Skill Gap Analysis
                </Button>
              </CardFooter>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>What happens next?</CardTitle>
                <CardDescription>
                  Here's what to expect after analyzing your curriculum
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="border rounded-lg p-4 text-center">
                    <div className="mx-auto h-12 w-12 rounded-full bg-edu-light flex items-center justify-center mb-3">
                      <LineChart className="h-6 w-6 text-edu-primary" />
                    </div>
                    <h4 className="font-medium mb-2">Skill Gap Analysis</h4>
                    <p className="text-sm text-gray-600">
                      We'll compare your curriculum skills against current job market demand to identify gaps.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 text-center">
                    <div className="mx-auto h-12 w-12 rounded-full bg-edu-light flex items-center justify-center mb-3">
                      <BookOpen className="h-6 w-6 text-edu-primary" />
                    </div>
                    <h4 className="font-medium mb-2">Personalized Recommendations</h4>
                    <p className="text-sm text-gray-600">
                      Get tailored course and certification recommendations to bridge your skill gaps.
                    </p>
                  </div>
                  
                  <div className="border rounded-lg p-4 text-center">
                    <div className="mx-auto h-12 w-12 rounded-full bg-edu-light flex items-center justify-center mb-3">
                      <Award className="h-6 w-6 text-edu-primary" />
                    </div>
                    <h4 className="font-medium mb-2">Learning Roadmap</h4>
                    <p className="text-sm text-gray-600">
                      We'll create a personalized learning roadmap to help you become job-ready.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        
        {/* Tips Section */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Tips for Better Results</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">What to Upload</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                  <span>Complete curriculum or syllabus documents</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                  <span>Course outlines with detailed topics</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                  <span>Semester-wise or year-wise course lists</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                  <span>Learning objective documents</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Supported Formats</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <FileText className="h-4 w-4 text-blue-600 mr-2 mt-0.5" />
                  <span>PDF documents (.pdf)</span>
                </li>
                <li className="flex items-start">
                  <FileText className="h-4 w-4 text-green-600 mr-2 mt-0.5" />
                  <span>Plain text files (.txt)</span>
                </li>
                <li className="flex items-start">
                  <AlertCircle className="h-4 w-4 text-yellow-600 mr-2 mt-0.5" />
                  <span>Maximum file size: 10MB</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UploadCurriculumPage;
