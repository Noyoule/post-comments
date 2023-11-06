export const fileUploadValidationOptions = (size: string = '5mb') => {
    return {
      size,
      extnames: ['jpg', 'png', 'jpeg']
    }
  }
  