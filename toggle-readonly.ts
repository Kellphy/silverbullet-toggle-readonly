import { clientStore, editor } from "@silverbulletmd/silverbullet/syscalls";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function toggleReadOnly() {
  const forcedROMode = await editor.getUiOption("forcedROMode");
  const newMode = !forcedROMode;

  await editor.setUiOption("forcedROMode", newMode);

  // Wait for Preact to re-render and update viewState
  for (let i = 0; i < 20; i++) {
    await sleep(50);
    const currentValue = await editor.getUiOption("forcedROMode");
    if (currentValue === newMode) {
      break;
    }
  }

  await editor.rebuildEditorState();

  editor.flashNotification(
    `Switched to ${forcedROMode ? "Edit" : "Read-Only"} Mode`,
  );
}

export async function enableReadOnlyOnInit() {
  // Clean up old persisted state from previous versions
  await clientStore.del("toggleReadOnlyMode");
  await editor.setUiOption("forcedROMode", true);
}
