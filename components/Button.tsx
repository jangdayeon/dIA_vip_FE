type Props = {
  text: string;
  bg: string;
};

export default function Button({ text, bg }: Props) {
  return (
    <button className={`border border-black ${bg} p-2 rounded-lg`}>
      {text}
    </button>
  );
}
