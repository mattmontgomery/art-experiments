interface ReverseGeocodeParams {
  latitude: number | undefined;
  longitude: number | undefined;
}

export const reverseGeocode = async ({
  latitude,
  longitude,
}: ReverseGeocodeParams): Promise<string | undefined> => {
  if (latitude === undefined || longitude === undefined) return undefined;

  const response = await fetch(
    `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
    {
      next: { revalidate: 86400 }, // Revalidate every 24 hours
    }
  );

  if (!response.ok) return undefined;

  const data = await response.json();
  console.log(data);
  return data.display_name;
};
