<template v-if="column.key === 'displayVersionData'">
  <a v-if="record.artifactUrl" 
     :href="record.artifactUrl" 
     target="_blank"
     rel="noopener noreferrer"
     :title="record.displayVersionData"> 
    {{ truncateText(record.displayVersionData, 10) }}
  </a>
  <span v-else :title="record.displayVersionData">
    {{ truncateText(record.displayVersionData, 10) }}
  </span>
</template>
const truncateText = (text, length) => {
      if (!text) return "";
      return text.length > length ? text.substring(0, length) + "..." : text;
    };