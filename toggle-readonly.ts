import {
  clientStore,
  editor,
  system,
} from "@silverbulletmd/silverbullet/syscalls";

const STORE_KEY = "toggleReadOnlyMode";

export async function toggleReadOnly() {
  const forcedROMode = await editor.getUiOption("forcedROMode");
  const newMode = !forcedROMode;

  editor.flashNotification(
    `Switching to ${forcedROMode ? "Edit" : "Read-Only"} Mode`,
  );

  await clientStore.set(STORE_KEY, newMode);
  await editor.setUiOption("forcedROMode", newMode);
  await editor.reloadUI();
}

export async function enableReadOnlyOnInit() {
  const savedMode = await clientStore.get(STORE_KEY);
  const shouldBeReadOnly = savedMode !== null && savedMode !== undefined
    ? savedMode
    : true;

  await editor.setUiOption("forcedROMode", shouldBeReadOnly);
}
