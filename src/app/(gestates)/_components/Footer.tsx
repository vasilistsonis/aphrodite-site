import Link from "next/link";

export default function Footer({ note }: { note?: string }) {
  return (
    <footer>
      <div className="wrap">
        <span>
          © {new Date().getFullYear()} Gestates{note ? ` · ${note}` : ""}
        </span>
        <span>
          <Link href="/">Home</Link> · <Link href="/aphrodite">Aphrodite Residences</Link> ·{" "}
          <Link href="/fleming">Fleming Residences</Link>
        </span>
      </div>
    </footer>
  );
}
