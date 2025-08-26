export async function getServerSideProps({ res }) {
  const content = `/* TEAM */\nDeveloper: Hoshi Vault Team via AI automation\nDesigner: Hoshi Vault Design System\nContact: info@hoshivault.com\n\n/* THANKS */\nThanks for visiting Hoshi Vault!`; // simple humans.txt
  res.setHeader('Content-Type', 'text/plain');
  res.write(content);
  res.end();
  return { props: {} };
}

export default function Humans() {
  return null;
}