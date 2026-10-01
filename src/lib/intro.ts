/** sessionStorage key set once the intro has played, so it only runs once per browser session.
 *  Lives in a plain module (not "use client") because the server layout's inline script needs the value. */
export const INTRO_KEY = "megara-intro";
