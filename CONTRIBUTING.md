# 贡献指南 / Contributing Guide

[English](#english) | [中文](#中文)

<a id="english"></a>
## Contributing to ReactUltra

Thank you for your interest in contributing to ReactUltra! This document provides guidelines and instructions to help you contribute effectively to this project.

### Code of Conduct

By participating in this project, you agree to abide by our code of conduct, which expects all participants to be respectful, inclusive, and considerate.

### Getting Started

1. **Fork the Repository**
   - Fork the ReactUltra repository to your GitHub account

2. **Clone Your Fork**
   ```bash
   git clone https://github.com/YOUR-USERNAME/reactultra.git
   cd reactultra
   ```

3. **Set Up Development Environment**
   ```bash
   pnpm install
   ```

4. **Create a Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
   - Name your branch in a descriptive way: `feature/...`, `bugfix/...`, `docs/...`, etc.

### Development Workflow

1. **Make Your Changes**
   - Write code following the style guides and best practices
   - Keep commits small and focused

2. **Write Tests**
   - Add tests for any new features
   - Ensure all tests pass with `pnpm test`

3. **Documentation**
   - Update documentation for any changed functionality
   - Include JSDoc comments for functions and components

4. **Commit Your Changes**
   - Follow the commit message conventions:
     ```
     type(scope): subject
     
     body (optional)
     ```
   - Types include: feat, fix, docs, style, refactor, test, chore
   - Example: `feat(auth): add two-factor authentication`

5. **Push to Your Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Create a Pull Request**
   - Go to the ReactUltra repository
   - Click "Compare & pull request"
   - Fill out the PR template with details about your changes

### Pull Request Process

1. **Code Review**: At least one maintainer will review your changes
2. **CI Checks**: All automated tests must pass
3. **Approval**: Changes require approval from at least one maintainer
4. **Merge**: A maintainer will merge your PR once approved

### Style Guide

#### JavaScript/TypeScript
- Follow the ESLint and Prettier configurations in the project
- Use TypeScript for all new code
- Prefer functional components with hooks
- Use named exports for components and utilities

#### Components
- One component per file
- Use function declarations for components, not arrow functions
- Place types/interfaces at the top of the file
- Follow the component folder structure

#### CSS
- Use the project's preferred styling approach consistently
- Avoid overly specific selectors
- Use design tokens for colors, spacing, etc.

### Testing Guidelines

- Write unit tests for utility functions
- Write component tests for UI components
- Focus on behavior, not implementation details
- Use React Testing Library for component testing

### Documentation

- Update the README.md if you add or change functionality
- Update Storybook stories for component changes
- Consider adding examples for complex features

### Additional Resources

- [React Documentation](https://reactjs.org/docs/getting-started.html)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Ant Design Guidelines](https://ant.design/docs/spec/introduce)

### Getting Help

If you have questions or need help, you can:
- Open an issue for discussion
- Reach out to maintainers via the provided contact methods

Thank you for contributing to ReactUltra!

---

<a id="中文"></a>
## 参与贡献 ReactUltra

感谢您有兴趣为 ReactUltra 做出贡献！本文档提供了指南和说明，帮助您有效地为该项目做出贡献。

### 行为准则

通过参与此项目，您同意遵守我们的行为准则，该准则期望所有参与者尊重、包容和体贴他人。

### 开始

1. **复刻仓库**
   - 将 ReactUltra 仓库复刻到您的 GitHub 账户

2. **克隆您的复刻**
   ```bash
   git clone https://github.com/您的用户名/reactultra.git
   cd reactultra
   ```

3. **设置开发环境**
   ```bash
   pnpm install
   ```

4. **创建分支**
   ```bash
   git checkout -b feature/您的功能名称
   ```
   - 以描述性方式命名您的分支：`feature/...`、`bugfix/...`、`docs/...` 等。

### 开发工作流程

1. **进行更改**
   - 按照样式指南和最佳实践编写代码
   - 保持提交小而集中

2. **编写测试**
   - 为任何新功能添加测试
   - 确保所有测试通过 `pnpm test`

3. **文档**
   - 更新任何更改功能的文档
   - 为函数和组件包含 JSDoc 注释

4. **提交您的更改**
   - 遵循提交信息约定：
     ```
     type(scope): subject
     
     body (可选)
     ```
   - 类型包括：feat、fix、docs、style、refactor、test、chore
   - 示例：`feat(auth): 添加双因素认证`

5. **推送到您的复刻**
   ```bash
   git push origin feature/您的功能名称
   ```

6. **创建拉取请求**
   - 前往 ReactUltra 仓库
   - 点击"Compare & pull request"
   - 填写 PR 模板，详细说明您的更改

### 拉取请求流程

1. **代码审查**：至少一名维护者将审查您的更改
2. **CI 检查**：所有自动测试必须通过
3. **批准**：更改需要至少一名维护者的批准
4. **合并**：经批准后，维护者将合并您的 PR

### 样式指南

#### JavaScript/TypeScript
- 遵循项目中的 ESLint 和 Prettier 配置
- 所有新代码使用 TypeScript
- 优先使用带有钩子的函数组件
- 对组件和工具使用命名导出

#### 组件
- 每个文件一个组件
- 使用函数声明定义组件，而不是箭头函数
- 将类型/接口放在文件顶部
- 遵循组件文件夹结构

#### CSS
- 一致地使用项目首选的样式方法
- 避免过于特定的选择器
- 使用设计令牌表示颜色、间距等

### 测试指南

- 为工具函数编写单元测试
- 为 UI 组件编写组件测试
- 关注行为，而非实现细节
- 使用 React Testing Library 进行组件测试

### 文档

- 如果添加或更改功能，请更新 README.md
- 为组件更改更新 Storybook 故事
- 考虑为复杂功能添加示例

### 其他资源

- [React 文档](https://reactjs.org/docs/getting-started.html)
- [TypeScript 文档](https://www.typescriptlang.org/docs)
- [Ant Design 指南](https://ant.design/docs/spec/introduce)

### 获取帮助

如果您有问题或需要帮助，您可以：
- 打开一个 issue 进行讨论
- 通过提供的联系方式联系维护者

感谢您为 ReactUltra 做出贡献！