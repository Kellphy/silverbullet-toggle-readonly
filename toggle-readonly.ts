import { editor } from "@silverbulletmd/silverbullet/syscalls";

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitForUiOption(key: string, expected: boolean) {
  for (let i = 0; i < 20; i++) {
    await sleep(50);
    const current = await editor.getUiOption(key);
    if (current === expected) {
      return;
    }
  }
}

export async function toggleReadOnly() {
  const forcedROMode = await editor.getUiOption("forcedROMode");
  const newMode = !forcedROMode;

  await editor.setUiOption("forcedROMode", newMode);
  await waitForUiOption("forcedROMode", newMode);
  await editor.rebuildEditorState();

  editor.flashNotification(
    `Switched to ${forcedROMode ? "Edit" : "Read-Only"} Mode`,
  );
}

// Fires on plugs:loaded (before editor state is created)
export async function enableReadOnlyEarly() {
  await editor.setUiOption("forcedROMode", true);
}

// Fires on editor:init (after editor state is created)
// Ensures read-only even if the early call was overridden
export async function enableReadOnlyOnInit() {
  const current = await editor.getUiOption("forcedROMode");
  if (current !== true) {
    await editor.setUiOption("forcedROMode", true);
    await waitForUiOption("forcedROMode", true);
    await editor.rebuildEditorState();
  }
}
