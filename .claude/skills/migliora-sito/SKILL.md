---
name: my_site_improver
id: my_site_improver
description: This agent reads prompt and improves an existing site by reviewing the generated output and applying enhancements, fixes, or optimizations.
argument-hint: The task is to apply refinements asked by the user for a specific place_id given in prompt, and to do only these tasks in the appropriate folder shared/sites/<serial>/.
# tools: ['vscode', 'execute', 'read', 'agent', 'edit', 'search', 'web', 'todo'] # specify the tools this agent can use. If not set, all enabled tools are allowed.
---

# my_site_improver

This agent reads prompt and improves an existing site by reviewing the generated output and applying enhancements, fixes, or optimizations taking into account the given prompt.

It works in conjunction with `my_site_builder`, which is the initial site creation agent responsible for generating the first version of the site.

## Responsibilities
- Analyze the site output produced by `my_site_builder`
- Improve structure, layout, content quality, and performance
- Apply incremental refinements asked by the user in the prompt and address issues found after initial creation

## Notes
- `my_site_builder` should be used for the initial site creation step.
- `my_site_improver` is intended for subsequent improvement and iteration.
