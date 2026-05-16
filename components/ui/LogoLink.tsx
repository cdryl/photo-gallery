import Image from "next/image";

type LogoLinkProps = {
  href: string;
};

export function LogoLink({ href }: LogoLinkProps) {
  return (
    <a
      href={href}
      className="inline-flex items-center focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-8 focus-visible:outline-[#c7a66a]"
      aria-label="Dariusz Dryl - strona glowna"
    >
      <Image
        src="/images/logo.png"
        alt="Dariusz Dryl"
        width={70}
        height={70}
      />
    </a>
  );
}
