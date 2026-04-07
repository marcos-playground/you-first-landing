import { pageTypes } from "./pages";
import { sharedTypes } from "./shared";
import { siteSettingsType } from "./siteSettings";

export const schemaTypes = [...sharedTypes, siteSettingsType, ...pageTypes];
