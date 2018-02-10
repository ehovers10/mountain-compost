---
title: Home on the range
description: >
  Resources dedicated to composting, tailored for mountain folk.
scripts: [toc,bunch,notes,models,datatables]
datatables: true
back: rocky-mountains1600-min.jpg
---

{% for item in site.resources | sort %}
[{{ item.title}}]({{item.permalink | prepend: site.baseurl}})

  > {{ item.description }}
{% endfor %}
