import { editor, system } from "@silverbulletmd/silverbullet/syscalls";

const CONFIG_KEY = "toggleReadonly";
const DEFAULT_READONLY = true;

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

async function getDefaultReadOnly(): Promise<boolean> {
  return await system.getSpaceConfig(CONFIG_KEY, DEFAULT_READONLY);
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

// Fires on editor:init (after editor state is created)
export async function enableReadOnlyOnInit() {
  const shouldBeReadOnly = await getDefaultReadOnly();
  const current = await editor.getUiOption("forcedROMode");
  if (current !== shouldBeReadOnly) {
    await editor.setUiOption("forcedROMode", shouldBeReadOnly);
    await waitForUiOption("forcedROMode", shouldBeReadOnly);
    await editor.rebuildEditorState();
  }
}
