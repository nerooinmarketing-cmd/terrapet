type TranslateTask = {
  text: string;
  resolve: (value: { es: string; fr: string }) => void;
};

const queue: TranslateTask[] = [];
let isProcessing = false;

async function processQueue() {
  if (isProcessing || queue.length === 0) return;
  isProcessing = true;

  while (queue.length > 0) {
    const task = queue.shift();
    if (!task) continue;

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: task.text }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      task.resolve({
        es: result.es || "",
        fr: result.fr || ""
      });
    } catch (error) {
      console.error("Translation error:", error);
      task.resolve({ es: "Error", fr: "Error" });
    }

    // Add a small delay between requests to avoid rate limits
    await new Promise(resolve => setTimeout(resolve, 500));
  }

  isProcessing = false;
}

export async function translateText(text: string): Promise<{ es: string; fr: string }> {
  if (!text) return { es: "", fr: "" };
  
  return new Promise((resolve) => {
    queue.push({ text, resolve });
    processQueue();
  });
}
