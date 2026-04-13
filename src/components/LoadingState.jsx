export default function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="w-12 h-12 border-4 border-[#4F46E5] border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-[#666666] text-[16px] font-medium">Loading...</p>
    </div>
  );
}
