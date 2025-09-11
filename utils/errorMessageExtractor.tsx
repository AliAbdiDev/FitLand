interface ErrorMessageExtractorProps {
  data: { field: string | number; message: string | number }[];
  isField?: boolean;
  isMessage?: boolean;
}
export const errorMessageExtractor = ({
  data=[],
  isField = true,
  isMessage = true,
}: ErrorMessageExtractorProps) => {
  if(!Array.isArray(data))return null;
  return data?.map(
    (err) => `${isField && err?.field}: ${isMessage && err?.message}`
  )?.[0];
};
