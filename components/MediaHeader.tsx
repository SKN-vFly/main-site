export function MediaHeader(props: { text: string }) {
  const { text } = props;
  return (
    <div className="bg-gray-200 text-black dark:bg-gray-800  dark:text-white p-4 w-[80%] min-h-[40vh] flex flex-col items-center justify-center mx-auto my-5 rounded-3xl">
      <h1 className="text-5xl font-bold">{text}</h1>
    </div>
  );
}
