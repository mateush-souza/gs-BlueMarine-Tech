window.watsonAssistantChatOptions = {
    integrationID: "077e3fd0-e316-47b5-b400-59ce635a3bd2",
    region: "au-syd",
    serviceInstanceID: "a60974e2-ae9c-4c92-b53f-af031624f3ff",
    onLoad: async (instance) => { await instance.render(); }
  };
  setTimeout(function(){
    const t=document.createElement('script');
    t.src="https://web-chat.global.assistant.watson.appdomain.cloud/versions/" + (window.watsonAssistantChatOptions.clientVersion || 'latest') + "/WatsonAssistantChatEntry.js";
    document.head.appendChild(t);
  });