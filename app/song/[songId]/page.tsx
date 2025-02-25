// eslint-disable-next-line @typescript-eslint/no-unused-vars
function generateStaticParams() {
  return [{ params: { songId: '1' } }];
}

export default async function Page({ params }: { params: Promise<{ songId: string }> }) {
  const songId = (await params).songId;
  return <div>song/{songId}</div>;
}
