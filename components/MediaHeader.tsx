export function MediaHeader(props: { text: string }) {
  const { text } = props;
  return (
    <div className="bg-gray-800 text-white p-4 w-full min-h-[60vh] flex flex-col items-center justify-center mx-auto lg:w-[80%]">
      <h1 className="text-3xl font-bold">{text}</h1>
    </div>
  );
}
