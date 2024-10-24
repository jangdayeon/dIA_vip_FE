export default function Button(text: string, bg: string) {
  return (
    <button className={`border border-black ${bg} p-2 rounded-lg`}>
      {text}
    </button>
  );
}
