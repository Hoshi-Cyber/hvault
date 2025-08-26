export async function getServerSideProps({ res }) {
  const content = `Contact: mailto:security@hoshivault.com\nExpires: 2025-12-31T23:59:59Z`; // example
  res.setHeader('Content-Type', 'text/plain');
  res.write(content);
  res.end();
  return { props: {} };
}

export default function SecurityTxt() {
  return null;
}