import {useLocation} from "react-router";
import { CookieManager } from "react-cookie-manager";
import "react-cookie-manager/style.css";
import React from "react";

export const CookieManagerWrapper = ({children}: any) => {
  const location = useLocation();

  return <CookieManager
    key={location.pathname}
    cookieKitId="683c788de26dc89719dacf67"
    privacyPolicyUrl="https://kirillareka.hu/privacy"
    displayType="banner"
    showManageButton={false}
    enableFloatingButton={location.pathname === "/privacy"}

    translations={{
      // Main consent banner/popup/modal
      title: "Ez a weboldal sütiket használ",
      message:
        "Kedves látogató! Szeretném felhívni a figyelmedet, hogy a honlap a felhasználói élmény fokozásának érdekében sütiket használ. További információkért kérlek olvasd el a Adatvédelmi Nyilatkozatot.",
      buttonText: "Elfogadom",
      declineButtonText: "Elutasítom",
      privacyPolicyText: "Adatvédelmi Nyilatkozat",

      // Manage consent modal
      manageTitle: "Süti beállítások",
      manageMessage: "Itt módosíthatja süti beállításait. Az alapvető sütik mindig engedélyezettek, mivel szükségesek a weboldal megfelelő működéséhez.",

      // Essential cookies section
      manageEssentialTitle: "Alapvető",
      manageEssentialSubtitle: "Szükséges a weboldal megfelelő működéséhez",
      manageEssentialStatus: "Státusz: Mindig engedélyezve",
      manageEssentialStatusButtonText: "Mindig bekapcsolva",

      // Analytics cookies section
      manageAnalyticsTitle: "Analitika",
      manageAnalyticsSubtitle: "Segít megérteni, hogyan lépnek kapcsolatba a látogatók weboldalunkkal",

      // Social cookies section
      manageSocialTitle: "Közösségi média",
      manageSocialSubtitle: "Engedélyezi a közösségi média funkcióit és a megosztást",

      // Advertising cookies section
      manageAdvertTitle: "Hirdetés",
      manageAdvertSubtitle: "Személyre szabja a hirdetéseket és méri azok teljesítményét",

      // Status messages
      manageCookiesStatus: "Státusz: {{status}} {{date}}", // Supports variables
      manageCookiesStatusConsented: "Hozzájárulás megadva",
      manageCookiesStatusDeclined: "Hozzájárulás megtagadva",

      // Buttons in manage modal
      manageCancelButtonText: "Mégse",
      manageSaveButtonText: "Változtatások mentése"
    }}

    classNames={{
      acceptButton: "px-3 py-1.5 text-xs font-medium rounded-md bg-blue-500 hover:bg-blue-600 text-white transition-all duration-200 hover:scale-105 focus-visible:outline-none focus:outline-none focus-visible:outline-transparent focus:outline-transparent privacy-accept-button"
    }}
  >
    {children}
  </CookieManager>
}