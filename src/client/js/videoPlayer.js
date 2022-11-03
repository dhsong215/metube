const video = document.querySelector("video");

const handlePlay = () => {
  const { id } = videoContainer.dataset;
  fetch(`/api/video/${id}/views`, {
    method: "POST",
  });
};

video.addEventListener("ended", handlePlay);
