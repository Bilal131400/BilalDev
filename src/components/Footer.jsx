export default function Footer() {
  return (
    <footer
      style={{
        padding: "24px 56px",
        borderTop: "1px solid var(--border)",
        background: "var(--bg-2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "16px",
      }}
    >
      <span
        style={{
          fontFamily: "Syne,sans-serif",
          fontWeight: 800,
          fontSize: "14px",
          color: "var(--text)",
          letterSpacing: "-0.02em",
        }}
      >
        BK<span style={{ color: "var(--accent)" }}>.</span>
      </span>

      <div className="flex items-center gap-2">
        <span
          style={{
            fontFamily: "DM Mono,monospace",
            fontSize: "10px",
            color: "var(--text-muted)",
            letterSpacing: "0.1em",
          }}
        >
          Lahore, PK · Open to work · © {new Date().getFullYear()}
        </span>
      </div>

      <div className="flex items-center gap-8">
        {[
          ["LinkedIn", "https://linkedin.com/in/bilal-khuram-772725307"],
          ["Email", "mailto:bilalkhuramofficial@gmail.com"],
        ].map(([l, h], i) => (
          <a
            key={i}
            href={h}
            className="hline"
            target={h.startsWith("http") ? "_blank" : undefined}
            rel="noreferrer"
            style={{
              fontFamily: "DM Mono,monospace",
              fontSize: "10px",
              color: "var(--text-muted)",
              textDecoration: "none",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {l}
          </a>
        ))}
      </div>
    </footer>
  );
}
