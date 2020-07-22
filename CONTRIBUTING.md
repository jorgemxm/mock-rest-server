# Contributing to MockRestServer

> Please read these guidelines before submitting an issue, filing a feature request, or contributing code.

## :bug: I Found a Bug

If you've found a bug in MockRestServer, **please [search](https://gitlab.com/GuilleW/mock-rest-server/-/issues) to see if it's already been reported**. Otherwise, create a [new issue](https://gitlab.com/GuilleW/mock-rest-server/-/issues/new). If you can fix the bug yourself, feel free to create a [pull request](https://gitlab.com/GuilleW/mock-rest-server/-/blob/master/CONTRIBUTING.md#exclamation-propose-a-change) thereafter.

Please include _as much detail as possible_ to help us reproduce and diagnose the bug.

Use this template for [:bug: bug report](https://gitlab.com/GuilleW/mock-rest-server/-/blob/master/.gitlab/Bug_report.md).

## :rocket: Feature request

Any help or feedback are really welcome!

Before you get your hands dirty, please [search](https://gitlab.com/GuilleW/mock-rest-server/-/issues) for a related issue, or [create a new one](https://gitlab.com/GuilleW/mock-rest-server/-/issues/new). If you wish to contribute a new feature, this is doubly important! Let's discuss your proposed changes first; I don't want you to waste time implementing a change that is at odds with the project's direction. That said, I'll happily consider any contribution, _no matter how great or small_.

Use this template for [:rocket: feature request](https://gitlab.com/GuilleW/mock-rest-server/-/blob/master/.gitlab/Feature_request.md).

### :page_with_curl: About Project Goals

MockRestServer adheres strictly to:
- [Semantic versioning](https://semver.org).
- [JavaScript Standard Style](https://standardjs.com).

Please, keep these goals in mind when making or proposing changes.

### :athletic_shoe: Contributing Code: Step-by-Step

Follow these steps to get going. If you are having trouble, don't be afraid to [ask for help](https://gitlab.com/GuilleW/mock-rest-server/-/issues/new).

1. [Install Node.js 10.3.0 or newer](https://nodejs.org/en/download/).
1. Follow [GitLab Docs](https://docs.gitlab.com/ee/user/project/repository/forking_workflow.html) on setting up Git, forking and cloning.
1. Create a new branch in your working copy. Give your branch a descriptive name, such as `issue/12345`: `git checkout -b issue/12345`.
1. Execute `npm ci` to install the development dependencies.
1. Make your changes and add them via `git add`.
   - Keep your PR focused. Don't fix two things at once; don't upgrade dependencies unless necessary.
1. Before committing, run `npm coverage`.
   - JavaScript Standard Style, Unit and/or integration **tests are required** for any code change.
   - **A drop in code coverage % is considered a failed check.**
1. Commit your changes.
   - Use a brief message on the first line, referencing a relevant issue (e.g. `closes #12345`).
   - Add detail in subsequent lines.
   - A pre-commit hook will run which automatically formats your staged changes (and fixes any problems it can) with ESLint and Prettier. If ESLint fails to fix an issue, your commit will fail and you will need to manually correct the problem.
1. <a name="up-to-date"/> (Optional) Ensure you are up-to-date with MockRestServer's `master` branch:
   - You can add an "upstream" remote repo using `git remote add upstream https://gitlab.com/GuilleW/mock-rest-server.git && git fetch upstream`.
   - Navigate to your `master` branch using `git checkout master`.
   - Pull changes from `upstream` using `git pull upstream master`.
   - If any changes were pulled in, rebase your branch onto `master` by switching back to your branch (`git checkout <your-branch>`) then rebasing using `git rebase master`.
1. Push your changes to your fork; `git push origin`.
1. In your browser, navigate to your fork's branch. You should see a notification about your recent changes in your fork's branch, with a blue button to create a merge request. Click it.
1. Describe your changes in detail here, following the template. Once you're satisfied, submit the form.
1. Continuous integration checks will run against your changes. The result of these checks will be displayed on your PR.
   - If the checks fail, you must address those before the PR is accepted.
   - GitLab will indicate if there's a conflict. If this happens, you will need to [rebase](https://docs.gitlab.com/ee/topics/git/useful_git_commands.html#rebase-your-branch-onto-master) your branch onto the `master` branch of the source repository. **Do not `git merge`**.
   - (Optional) [Squash](https://gitlab.com/help/user/project/merge_requests/squash_and_merge) your changesets. If you have multiple changesets in your PR, they will be squashed upon PR acceptance.
1. Be patient while your PR is reviewed. This can take a while. I may request changes, but don't be afraid to question them.
1. Your PR might become conflicted with the code in `master`. If this is the case, you will need to [update your PR](https://gitlab.com/GuilleW/mock-rest-server/-/CONTRIBUTING.md#up-to-date) and resolve your conflicts.
1. You don't need to make a new PR to any needed changes. Instead, commit on top of your changes, and push these to your fork's branch. The PR will be updated, and CI will re-run.

## :angel: I Just Want To Help

_Excellent._ Here's how:

- **Handy with JavaScript?** Please check out the issues labeled [`ask for help`](https://gitlab.com/GuilleW/mock-rest-server/issues?q=is%3Aopen+is%3Aissue+label%3A%22ask+for+help%22).
- **Can you write ~~good~~ well?** The [README.md](https://gitlab.com/GuilleW/mock-rest-server/-/blob/master/README.md) can be improved, feel free to [suggest change](https://gitlab.com/GuilleW/mock-rest-server/-/issues/new).
