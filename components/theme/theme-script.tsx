export function ThemeScript() {
  const script = `
    (function () {
      try {
        const savedTheme = localStorage.getItem("theme");

        const systemTheme = window.matchMedia(
          "(prefers-color-scheme: dark)"
        ).matches
          ? "dark"
          : "light";

        const theme =
          savedTheme === "light" || savedTheme === "dark"
            ? savedTheme
            : systemTheme;

        const root = document.documentElement;

        root.classList.remove("light", "dark");
        root.classList.add(theme);
        root.style.colorScheme = theme;
      } catch (error) {
        document.documentElement.classList.add("dark");
        document.documentElement.style.colorScheme = "dark";
      }
    })();
  `;

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: script,
      }}
    />
  );
}
