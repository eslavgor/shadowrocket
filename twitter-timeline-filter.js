// Safe filter that keeps entry structure but neuters promotedMetadata
let body = $response.body;
if (!body) $done({});

try {
  let obj = JSON.parse(body);

  if (obj.timeline?.instructions) {
    obj.timeline.instructions = obj.timeline.instructions.map(instruction => {
      if (instruction.entries) {
        instruction.entries = instruction.entries.map(entry => {
          const content = entry.content?.itemContent;
          if (content?.promotedMetadata) {
            delete content.promotedMetadata;
          }
          return entry;
        });
      }
      return instruction;
    });
  }

  $done({ body: JSON.stringify(obj) });
} catch (err) {
  console.log('[TwitterFilter] Failed:', err);
  $done({});
}
