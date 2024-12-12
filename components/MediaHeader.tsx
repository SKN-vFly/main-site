export function MediaHeader(props: { text: string }) {
  const { text } = props;
  return (
    <div className="bg-gray-800 text-white p-4 w-full min-h-[60vh] flex flex-col items-center justify-center mx-auto lg:w-[60%] my-5 rounded-3xl">
      <h1 className="text-5xl font-bold">{text}</h1>
    </div>
  );
}
