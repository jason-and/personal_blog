---
layout: base
title: Photography
type: page
bodyClass: gallery-page
templateEngineOverride: njk,md
---

{% if collections.galleryItems.length %}
<div class="gallery-grid">
  {% for item in collections.galleryItems %}
  <div class="gallery-item"
       data-image="{{ item.data.gallery_image }}"
       data-caption="{{ item.data.gallery_caption or item.data.title }}"
       data-post-url="{% if 'posts' in (item.data.tags or []) %}{{ item.url }}{% endif %}"
       data-post-title="{{ item.data.title }}"
       role="button"
       tabindex="0"
       aria-label="View {{ item.data.gallery_caption or item.data.title }}">
    <img src="{{ item.data.gallery_image }}"
         alt="{{ item.data.gallery_caption or item.data.title }}"
         loading="lazy">
    <div class="gallery-item-caption">{{ item.data.gallery_caption or item.data.title }}</div>
  </div>
  {% endfor %}
</div>
{% else %}
<p>No photos yet.</p>
{% endif %}

<div id="lightbox" class="lightbox" role="dialog" aria-modal="true" aria-label="Photo viewer">
  <button class="lightbox-close" aria-label="Close">&times;</button>
  <div class="lightbox-content">
    <img id="lightbox-img" src="" alt="">
    <div class="lightbox-info">
      <p id="lightbox-caption" class="lightbox-caption"></p>
      <a id="lightbox-post-link" href="" class="lightbox-post-link" hidden>Read post &rarr;</a>
    </div>
  </div>
</div>

<script>
(function () {
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightbox-img');
  var lightboxCaption = document.getElementById('lightbox-caption');
  var lightboxPostLink = document.getElementById('lightbox-post-link');
  var closeBtn = lightbox.querySelector('.lightbox-close');

  function openLightbox(image, caption, postUrl, postTitle) {
    lightboxImg.src = image;
    lightboxImg.alt = caption;
    lightboxCaption.textContent = caption;
    if (postUrl) {
      lightboxPostLink.href = postUrl;
      lightboxPostLink.textContent = 'Read: ' + postTitle + ' \u2192';
      lightboxPostLink.hidden = false;
    } else {
      lightboxPostLink.hidden = true;
    }
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeLightbox() {
    lightbox.classList.remove('active');
    lightboxImg.src = '';
    document.body.style.overflow = '';
  }

  document.querySelectorAll('.gallery-item').forEach(function (item) {
    function activate() {
      openLightbox(
        item.dataset.image,
        item.dataset.caption,
        item.dataset.postUrl,
        item.dataset.postTitle
      );
    }
    item.addEventListener('click', activate);
    item.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
    });
  });

  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', function (e) {
    if (e.target === lightbox) closeLightbox();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) closeLightbox();
  });
}());
</script>
