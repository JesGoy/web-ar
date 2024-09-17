export async function getCurrentLanguage(): Promise<string> {
  try {
    const language = navigator.language.startsWith("es") ? "es" : "en";
    return language;
  } catch (error) {
    return "es";
  }
}
