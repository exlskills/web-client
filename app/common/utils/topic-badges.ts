const badgesBaseURL = "https://s3-us-west-2.amazonaws.com/exlskills-topic-badges/";

const unknownBadgeURL = `${badgesBaseURL}default.png`;

const topicToBadge: {[key: string]: string} = {
  "bash": "bash-shell.png",
  "shell": "bash-shell.png",
  "cpp": "c-plus-plus.png",
  "c": "c.png",
  "c-sharp": "c-sharp.png",
  "css": "css.png",
  "dev-ops": "dev-ops.png",
  "dotnet": "dotnet.png",
  "dot-net": "dotnet.png",
  "go": "go.png",
  "html": "html.png",
  "java": "java.png",
  "javascript": "javascript.png",
  "kotlin": "kotlin.png",
  "php": "php.png",
  "python": "python.png",
  "ruby": "ruby.png",
  "r": "r.png",
  "scala": "scala.png",
  "sql": "sql.png",
  "swift": "swift.png",
  "typescript": "typescript.png",
  "ui-design": "ui-design.png",
  "ux-design": "ux-design.png"
};

export const getBadgeURLForTopic = (topic: string | null | undefined): string => {
  if (!topic) {
    return unknownBadgeURL;
  }
  topic = topic.toLowerCase();
  topic = topic.replace(' ', '-');
  return topicToBadge[topic] ? `${badgesBaseURL}${topicToBadge[topic]}` : unknownBadgeURL;
};
