// Pulls current CMS data for Mission Hospital (CCN 340002).
// Usage: node refresh.mjs
// Prints values to merge into data.json and the DATA block in index.html.

const CCN = "340002";

const HCAHPS_URL =
  `https://data.cms.gov/provider-data/api/1/datastore/query/dgck-syfz/0` +
  `?conditions%5B0%5D%5Bproperty%5D=facility_id&conditions%5B0%5D%5Bvalue%5D=${CCN}&limit=100`;

const AFFIL_URL =
  `https://data.cms.gov/provider-data/api/1/datastore/query/27ea-46a8/0` +
  `?conditions%5B0%5D%5Bproperty%5D=facility_affiliations_certification_number` +
  `&conditions%5B0%5D%5Bvalue%5D=${CCN}&limit=1&results=false&schema=false`;

const WANT = {
  H_STAR_RATING: "Summary star rating",
  H_HSP_RATING_9_10: "Rated 9-10 (%)",
  H_HSP_RATING_0_6: "Rated 6 or lower (%)",
  H_RECMND_DY: "Definitely recommend (%)",
  H_COMP_1_A_P: "Nurses always communicated (%)",
  H_COMP_2_A_P: "Doctors always communicated (%)",
  H_CLEAN_HSP_A_P: "Room always clean (%)",
  H_QUIET_HSP_A_P: "Always quiet at night (%)",
};

const j = (u) => fetch(u).then((r) => {
  if (!r.ok) throw new Error(`${r.status} ${u}`);
  return r.json();
});

const [hcahps, affil] = await Promise.all([j(HCAHPS_URL), j(AFFIL_URL)]);

console.log(`Mission Hospital (${CCN}) — CMS pull ${new Date().toISOString().slice(0, 10)}\n`);

const rows = hcahps.results ?? [];
if (rows.length === 0) console.log("!! HCAHPS returned no rows — check dataset id dgck-syfz");
else {
  console.log(`Survey period: ${rows[0].start_date} – ${rows[0].end_date}`);
  for (const [id, label] of Object.entries(WANT)) {
    const r = rows.find((x) => x.hcahps_measure_id === id);
    if (!r) { console.log(`  ${label}: NOT FOUND`); continue; }
    const v = id.endsWith("STAR_RATING") ? r.patient_survey_star_rating : r.hcahps_answer_percent;
    console.log(`  ${label}: ${v}`);
  }
  const stars = rows.filter((x) => x.hcahps_measure_id.endsWith("STAR_RATING"));
  console.log("\nComponent stars:");
  for (const s of stars) console.log(`  ${s.hcahps_question}: ${s.patient_survey_star_rating}`);
}

console.log(`\nAffiliated clinicians: ${affil.count}`);
console.log("\nNext: append these as a new snapshot in data.json and index.html's DATA block (don't overwrite history).");
