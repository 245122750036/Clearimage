'use client';

import { useState, useRef, ChangeEvent } from 'react';
import Image from 'next/image';
import { Satellite, UploadCloud, WandSparkles, Image as ImageIcon, AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { ZoomPanImage } from './zoom-pan-image';
import { handleEnhanceImage } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';

async function imageUrlToDataUrl(url: string): Promise<string> {
  const response = await fetch(url);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export function ClaritySatClient() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [enhancedImage, setEnhancedImage] = useState<string | null>(null);
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 4 * 1024 * 1024) { // 4MB limit
        toast({
          variant: 'destructive',
          title: 'File Too Large',
          description: 'Please upload an image smaller than 4MB.',
        });
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        setOriginalImage(e.target?.result as string);
        setEnhancedImage(null);
        setError(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const onEnhanceClick = async () => {
    if (!originalImage) return;

    setIsEnhancing(true);
    setError(null);
    setEnhancedImage(null);

    try {
      let imageDataUrl = originalImage;
      if (originalImage.startsWith('http')) {
        imageDataUrl = await imageUrlToDataUrl(originalImage);
      }
      
      const result = await handleEnhanceImage({ imageDataUrl });
      
      if (result.success && result.data?.highResolutionImage) {
        setEnhancedImage(result.data.highResolutionImage);
      } else {
        const errorMessage = result.error || 'An unknown error occurred.';
        setError(errorMessage);
        toast({
          variant: 'destructive',
          title: 'Enhancement Failed',
          description: errorMessage,
        });
      }
    } catch (err) {
      const errorMessage = 'An unexpected error occurred while processing the image.';
      setError(errorMessage);
      toast({
          variant: 'destructive',
          title: 'Enhancement Failed',
          description: errorMessage,
        });
    } finally {
      setIsEnhancing(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground p-4 sm:p-6 lg:p-8">
      <header className="text-center mb-8">
        <div className="inline-flex items-center gap-3">
          <Satellite className="h-10 w-10 text-primary" />
          <h1 className="text-4xl md:text-5xl font-bold font-headline tracking-tight">ClaritySat</h1>
        </div>
        <p className="text-muted-foreground mt-2 text-lg">
          Transform low-resolution satellite images into 4K masterpieces with AI.
        </p>
      </header>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        <Card className="overflow-hidden shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">Original Image</CardTitle>
            <CardDescription>Upload your low-resolution satellite image here.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="aspect-square w-full rounded-md border-2 border-dashed flex items-center justify-center bg-card">
              {originalImage ? (
                <Image
                  src={originalImage}
                  alt="Original satellite image"
                  width={1024}
                  height={1024}
                  className="object-contain w-full h-full"
                  data-ai-hint="low-resolution satellite"
                />
              ) : (
                <div className="text-center text-muted-foreground p-4">
                  <ImageIcon className="mx-auto h-12 w-12 mb-2" />
                  <p>Image preview will appear here</p>
                </div>
              )}
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                accept="image/png, image/jpeg, image/webp"
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
              >
                <UploadCloud />
                Upload Image
              </Button>
              <Button onClick={onEnhanceClick} disabled={!originalImage || isEnhancing} className="w-full">
                {isEnhancing ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Enhancing...
                  </>
                ) : (
                  <>
                    <WandSparkles />
                    Enhance Image
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden shadow-lg">
          <CardHeader>
            <CardTitle>Enhanced Image</CardTitle>
            <CardDescription>Your 4K image with enhanced details. Zoom and pan to explore.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-square w-full rounded-md border-2 border-dashed flex items-center justify-center bg-card relative">
              {isEnhancing && (
                <div className="w-full h-full flex flex-col items-center justify-center gap-4">
                   <Skeleton className="h-full w-full" />
                </div>
              )}
              {!isEnhancing && error && (
                <Alert variant="destructive" className="m-4">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              {!isEnhancing && !error && enhancedImage && (
                <ZoomPanImage src={enhancedImage} alt="Enhanced satellite image" />
              )}
              {!isEnhancing && !error && !enhancedImage && (
                <div className="text-center text-muted-foreground p-4">
                  <ImageIcon className="mx-auto h-12 w-12 text-accent" />
                  <p className="mt-2">Your enhanced image will appear here.</p>
                  <p className="text-sm">Roads and buildings will be crystal clear.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
