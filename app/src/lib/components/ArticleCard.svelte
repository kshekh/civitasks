<script>
  export let article;
</script>

{#if article}
  <article
    class="relative isolate rounded-2xl border border-gray-8 bg-gray-11 p-6 before:absolute before:inset-1 before:-z-10 before:rounded-2xl before:border before:border-gray-9"
  >
    <div>
      <img
        class="mb-6 rounded-lg"
        src="/images/blog/article-placeholder.png"
        alt=""
      />
      <div class="mb-4 flex items-center gap-4 text-sm font-medium text-mint-1">
        <p>{article.publicationDate}</p>
        <p>{article.readingTime}</p>
      </div>
      <div>
        <h3 class="mb-2 text-2xl font-medium text-gray-1">
          <a
            class="transition-colors duration-300 ease-in-out focus-within:text-green-1 hover:text-green-1"
            href="#/">{article.title}</a
          >
        </h3>
        <p class="text-gray-4">
          {article.excerpt}
        </p>
      </div>
    </div>
  </article>
{:else}
  <p>No article found.</p>
{/if}
