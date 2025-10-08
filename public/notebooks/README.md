# Jupyter Notebook 文件说明

本目录包含真实的Jupyter Notebook文件（`.ipynb`格式），用于展示数据分析项目。

## 📁 文件列表

| 文件名 | 项目ID | 分析主题 | 单元格数 |
|--------|--------|----------|---------|
| `rfm-analysis.ipynb` | 1 | RFM用户分层分析 | 3 cells |
| `sales-forecast.ipynb` | 3 | 销售趋势与预测 | 3 cells |
| `churn-prediction.ipynb` | 4 | 用户流失预测 | 3 cells |
| `market-basket.ipynb` | 5 | 购物篮关联分析 | 3 cells |

## 🔧 技术实现

### Notebook格式
所有文件遵循**Jupyter Notebook格式标准** (nbformat 4.4):
- ✅ 标准JSON结构
- ✅ 包含markdown和code类型的cell
- ✅ 包含执行输出（stdout）
- ✅ 包含执行计数（execution_count）

### 前端加载逻辑
```typescript
// components/notebook-viewer.tsx
useEffect(() => {
  const loadNotebook = async () => {
    const response = await fetch('/notebooks/rfm-analysis.ipynb')
    const ipynb = await response.json()
    
    // 转换ipynb格式到内部格式
    const cells = ipynb.cells.map(cell => ({
      type: cell.cell_type,
      content: Array.isArray(cell.source) ? cell.source.join('') : cell.source,
      outputs: cell.outputs,
      executionCount: cell.execution_count
    }))
    
    setNotebookData(cells)
  }
}, [projectId])
```

## 📊 数据流程

```
用户点击"查看 Notebook"
    ↓
前端fetch对应的.ipynb文件
    ↓
解析JSON格式
    ↓
转换为内部数据结构
    ↓
渲染Markdown + Code + Output
    ↓
SVG图表实时生成
```

## 🎨 显示特性

- **代码高亮**: 使用SyntaxHighlighter显示Python代码
- **Markdown渲染**: 支持标题、列表、粗体等格式
- **执行输出**: 显示文本输出、表格、图表
- **图表可视化**: SVG动态生成，支持亮色/暗色主题
- **Cell折叠**: 可展开/折叠代码单元
- **执行计数**: 显示In [1], In [2]等标记

## 🚀 如何添加新Notebook

### 方法1: 使用生成脚本
```python
# scripts/generate_notebooks.py
python scripts/generate_notebooks.py
```

### 方法2: 手动创建
```json
{
  "cells": [
    {
      "cell_type": "markdown",
      "metadata": {},
      "source": ["# 标题\n\n描述内容"]
    },
    {
      "cell_type": "code",
      "execution_count": 1,
      "metadata": {},
      "outputs": [
        {
          "output_type": "stream",
          "name": "stdout",
          "text": ["输出内容\n"]
        }
      ],
      "source": ["print('Hello World')"]
    }
  ],
  "metadata": {
    "kernelspec": {
      "display_name": "Python 3",
      "language": "python",
      "name": "python3"
    }
  },
  "nbformat": 4,
  "nbformat_minor": 4
}
```

### 方法3: 从真实Jupyter导出
1. 在Jupyter Notebook中完成分析
2. File → Download as → Notebook (.ipynb)
3. 将文件复制到`public/notebooks/`目录
4. 更新`NotebookViewer`组件中的文件映射

## 📈 未来扩展

- [ ] 支持更多输出类型（HTML表格、LaTeX公式、图片base64）
- [ ] 添加代码执行功能（WebAssembly Python）
- [ ] 支持交互式图表（Plotly）
- [ ] 导出功能（下载.ipynb文件）
- [ ] 分享功能（生成链接）

## 🔗 相关文件

- `components/notebook-viewer.tsx` - Notebook渲染组件
- `lib/projects.ts` - 项目数据定义
- `components/project-card-new.tsx` - 项目卡片
- `scripts/generate_notebooks.py` - Notebook生成脚本

---

**注意**: 这些是演示用的Notebook文件。实际生产环境中，可以使用真实的数据分析Notebook，或通过后端API动态生成。


