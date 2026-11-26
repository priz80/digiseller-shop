import type { ReactNode } from "react";

interface LegalPageProps {
  title: string;
  description: string;
  children: ReactNode;
}

export function LegalPage({ title, description, children }: LegalPageProps) {
  return (
    <main className="legal-page">
      <article>
        <header className="legal-page-header">
          <h1>{title}</h1>
          <p>{description}</p>
        </header>
        <div className="legal-page-content">{children}</div>
      </article>
    </main>
  );
}
