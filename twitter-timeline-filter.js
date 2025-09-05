// twitter-timeline-filter.js
let body = $response.body;
if (!body) $done({});

try {
  let obj = JSON.parse(body);

  // Twitter timeline structure often uses "instructions" with "entries"
  if (obj.timeline?.instructions) {
    obj.timeline.instructions = obj.timeline.instructions.map(instruction => {
      if (instruction.entries) {
        instruction.entries = instruction.entries.filter(entry => {
          const entryId = entry.entryId || '';
          const content = entry.content?.itemContent;
          const isPromoted = /promoted/.test(entryId);
          const hasPromotedMetadata = !!content?.promotedMetadata;
          return !(isPromoted || hasPromotedMetadata);
        });
      }
      return instruction;
    });
  }

  $done({ body: JSON.stringify(obj) });

} catch (e) {
  console.log("[TwitterFilter] Failed:", e);
  $done({});
}
