const IMGBB_API_KEY = 'ecdc8fc2318d26f07e76199707dd4ba8';

export const uploadImageToImgBB = async (base64Image: string) => {
  const formData = new FormData();

  formData.append('image', base64Image);

  const response = await fetch(
    `https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`,
    {
      method: 'POST',
      body: formData,
    }
  );

  const data = await response.json();

  if (!response.ok || !data.success) {
    throw new Error('Не удалось загрузить изображение');
  }

  return data.data.url;
};