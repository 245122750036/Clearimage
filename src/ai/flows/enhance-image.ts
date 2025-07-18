// This file is generated by Firebase Extensions Studio
'use server';
/**
 * @fileOverview An AI agent that enhances a low-resolution satellite image to a high-resolution image.
 *
 * - enhanceImage - A function that handles the image enhancement process.
 * - EnhanceImageInput - The input type for the enhanceImage function.
 * - EnhanceImageOutput - The return type for the enhanceImage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const EnhanceImageInputSchema = z.object({
  lowResolutionImage: z
    .string()
    .describe(
      "A low-resolution satellite image as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type EnhanceImageInput = z.infer<typeof EnhanceImageInputSchema>;

const EnhanceImageOutputSchema = z.object({
  highResolutionImage: z
    .string()
    .describe(
      'The enhanced high-resolution satellite image as a data URI that must include a MIME type and use Base64 encoding.'
    ),
});
export type EnhanceImageOutput = z.infer<typeof EnhanceImageOutputSchema>;

export async function enhanceImage(input: EnhanceImageInput): Promise<EnhanceImageOutput> {
  return enhanceImageFlow(input);
}

const enhanceImageFlow = ai.defineFlow(
  {
    name: 'enhanceImageFlow',
    inputSchema: EnhanceImageInputSchema,
    outputSchema: EnhanceImageOutputSchema,
  },
  async input => {
    const {media} = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: [
        {media: {url: input.lowResolutionImage}},
        {
          text: 'Enhance this low-resolution satellite image to a high-quality, clear, and sharp 4K image. Do not add any new features or objects to the image, only improve the existing details and clarity.',
        },
      ],
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });
    return {highResolutionImage: media!.url!};
  }
);
