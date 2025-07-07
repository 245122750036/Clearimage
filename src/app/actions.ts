'use server';

import { enhanceImage, EnhanceImageInput } from '@/ai/flows/enhance-image';
import { z } from 'zod';

const actionSchema = z.object({
  imageDataUrl: z.string().refine(val => val.startsWith('data:image/'), {
    message: 'Image data URL is invalid',
  }),
});

export async function handleEnhanceImage(formData: { imageDataUrl: string }) {
  try {
    const validatedData = actionSchema.safeParse(formData);
    if (!validatedData.success) {
      return { success: false, error: 'Invalid input.' };
    }

    const input: EnhanceImageInput = {
      lowResolutionImage: validatedData.data.imageDataUrl,
    };

    const result = await enhanceImage(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to enhance image. Please try again.' };
  }
}
