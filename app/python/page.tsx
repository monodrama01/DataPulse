"use client"

import { Navigation } from "@/components/navigation"
import { getLucideIcon } from "@/components/LucideIcon"
import { Home, ArrowUp } from "lucide-react"
import Link from "next/link"
import { useTheme } from "@/components/theme-provider"
import { useState, useEffect } from "react"

export default function PythonPage() {
  const { theme } = useTheme()
  const [activeSection, setActiveSection] = useState('intro')
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400)
      
      const sections = [
        'intro', 'env-setup', 'python-basics', 'numpy', 'pandas', 
        'matplotlib-seaborn', 'data-cleaning', 'eda', 'sql-integration',
        'automation', 'best-practices', 'common-mistakes', 'templates',
        'advanced-libs', 'jupyter', 'data-io', 'pandas-advanced', 
        'string-processing', 'time-series-advanced', 'project-case', 
        'project-sales', 'project-churn', 'learning-path'
      ]
      
      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const isDark = theme === 'dark'

  const navItems = [
    { id: 'intro', icon: '🎯', label: 'Python知识体系', color: 'purple' },
    { id: 'env-setup', icon: '⚙️', label: '01. 环境搭建', color: 'blue' },
    { id: 'python-basics', icon: '📚', label: '02. Python基础', color: 'green' },
    { id: 'numpy', icon: '🔢', label: '03. NumPy数组计算', color: 'yellow' },
    { id: 'pandas', icon: '🐼', label: '04. Pandas数据处理', color: 'red' },
    { id: 'matplotlib-seaborn', icon: '📊', label: '05. 可视化库', color: 'pink' },
    { id: 'data-cleaning', icon: '🧹', label: '06. 数据清洗', color: 'indigo' },
    { id: 'eda', icon: '🔍', label: '07. 探索性分析EDA', color: 'orange' },
    { id: 'sql-integration', icon: '🔗', label: '08. Python × SQL', color: 'teal' },
    { id: 'automation', icon: '⚡', label: '09. 自动化脚本', color: 'cyan' },
    { id: 'best-practices', icon: '✨', label: '10. 最佳实践', color: 'rose' },
    { id: 'common-mistakes', icon: '⚠️', label: '11. 常见错误避坑', color: 'amber' },
    { id: 'templates', icon: '📦', label: '12. 代码模板库', color: 'lime' },
    { id: 'advanced-libs', icon: '🚀', label: '13. 进阶库推荐', color: 'emerald' },
    { id: 'jupyter', icon: '📓', label: '14. Jupyter完全指南', color: 'sky' },
    { id: 'data-io', icon: '💾', label: '15. 数据导入导出', color: 'indigo' },
    { id: 'pandas-advanced', icon: '🐼', label: '16. Pandas高级技巧', color: 'orange' },
    { id: 'string-processing', icon: '📝', label: '17. 字符串处理', color: 'green' },
    { id: 'time-series-advanced', icon: '📅', label: '18. 时间序列深度', color: 'cyan' },
    { id: 'project-case', icon: '🎯', label: '19. 电商用户分析', color: 'purple' },
    { id: 'project-sales', icon: '📊', label: '20. 销售额预测', color: 'blue' },
    { id: 'project-churn', icon: '⚠️', label: '21. 用户流失预警', color: 'red' },
    { id: 'learning-path', icon: '🗺️', label: '22. 学习路径', color: 'violet' }
  ]

  const parts = [
    {
      id: 'env-setup',
      title: 'PART 01 环境搭建',
      subtitle: '工欲善其事，必先利其器 —— 高效环境配置',
      items: [
        {
          emoji: '🐍',
          title: 'Python版本选择 ☆',
          desc: '推荐Python 3.9+（数据分析3.9-3.11最稳定，3.12部分库可能不兼容）',
          detail: '**典型业务场景**：数据分析项目建议3.9-3.11，兼容性好、库支持全\\n**易踩坑点**：3.12+部分数据分析库（如某些版本的pandas、numpy）可能有兼容性问题\\n**可继续深挖**：虚拟环境管理（venv、conda）、版本隔离策略',
          code: `# 查看Python版本
python --version

# 推荐：使用conda创建虚拟环境
conda create -n data_analysis python=3.11
conda activate data_analysis

# 或使用venv
python -m venv myenv
# Windows激活
myenv\\Scripts\\activate
# Mac/Linux激活
source myenv/bin/activate`
        },
        {
          emoji: '📦',
          title: '核心库安装 ☆',
          desc: '数据分析四大件：pandas, numpy, matplotlib, seaborn',
          detail: '**典型业务场景**：一行命令安装所有数据分析核心库\\n**易踩坑点**：直接pip install可能遇到依赖冲突，推荐使用requirements.txt或conda\\n**可继续深挖**：pip vs conda区别、镜像源配置（清华/阿里）加速',
          code: `# 方式1：单独安装
pip install pandas numpy matplotlib seaborn

# 方式2：批量安装（推荐）
pip install pandas==2.1.0 numpy==1.24.3 matplotlib==3.7.2 seaborn==0.12.2

# 方式3：使用requirements.txt
# 创建requirements.txt文件，内容如下：
pandas>=2.0.0
numpy>=1.24.0
matplotlib>=3.7.0
seaborn>=0.12.0
scikit-learn>=1.3.0
openpyxl>=3.1.0
xlrd>=2.0.0
pymysql>=1.1.0
sqlalchemy>=2.0.0

# 然后执行
pip install -r requirements.txt

# 配置国内镜像源（加速下载）
pip install -i https://pypi.tuna.tsinghua.edu.cn/simple pandas`
        },
        {
          emoji: '💻',
          title: 'IDE选择',
          desc: 'Jupyter Notebook适合探索分析，VSCode/PyCharm适合工程化开发',
          detail: '**典型业务场景**：数据探索用Jupyter，生产脚本用VSCode/PyCharm\\n**易踩坑点**：Jupyter中变量作用域混乱，调试困难\\n**可继续深挖**：JupyterLab、Google Colab、VS Code插件推荐',
          code: `# 安装Jupyter
pip install jupyter notebook jupyterlab

# 启动Jupyter Notebook
jupyter notebook

# 启动JupyterLab（推荐，功能更强）
jupyter lab

# VSCode推荐插件
# - Python (Microsoft)
# - Jupyter (Microsoft)
# - Pylance (语法提示)
# - autoDocstring (文档生成)`
        }
      ]
    },
    {
      id: 'python-basics',
      title: 'PART 02 Python基础',
      subtitle: '数据分析必备的Python核心语法（80%场景只需20%语法）',
      items: [
        {
          emoji: '📝',
          title: '数据结构（必背）☆',
          desc: 'list、dict、tuple、set —— 数据分析90%场景只用这4个',
          detail: '**典型业务场景**：list存储数据行，dict存储键值对配置，set去重\\n**易踩坑点**：list是可变对象，作为函数默认参数会出bug\\n**可继续深挖**：列表推导式、字典推导式、生成器表达式',
          code: `# List列表（最常用）
data = [1, 2, 3, 4, 5]
data.append(6)  # 添加元素
data[0]  # 索引
data[1:3]  # 切片

# Dict字典（存储配置、映射关系）
config = {
    'db_host': 'localhost',
    'db_port': 3306,
    'db_name': 'sales'
}
config['db_host']  # 取值
config.get('db_user', 'default_user')  # 安全取值（带默认值）

# Tuple元组（不可变，常用于返回多个值）
def get_stats(data):
    return len(data), sum(data), sum(data)/len(data)
count, total, avg = get_stats([1, 2, 3, 4, 5])

# Set集合（去重、交并集运算）
ids_set1 = {1, 2, 3, 4}
ids_set2 = {3, 4, 5, 6}
ids_set1 & ids_set2  # 交集 {3, 4}
ids_set1 | ids_set2  # 并集 {1, 2, 3, 4, 5, 6}
ids_set1 - ids_set2  # 差集 {1, 2}

# 列表推导式（高效生成列表）
squares = [x**2 for x in range(10)]
even_squares = [x**2 for x in range(10) if x % 2 == 0]`
        },
        {
          emoji: '🔄',
          title: '循环与条件 ☆',
          desc: 'for循环遍历数据，if判断筛选逻辑',
          detail: '**典型业务场景**：遍历DataFrame行、批量处理文件\\n**易踩坑点**：能用向量化运算就别用for循环（pandas中for慢100倍）\\n**可继续深挖**：enumerate()、zip()、itertools模块',
          code: `# For循环
data = [1, 2, 3, 4, 5]
for item in data:
    print(item)

# enumerate（同时获取索引和值）
for idx, value in enumerate(data):
    print(f"索引{idx}: 值{value}")

# zip（同时遍历多个列表）
names = ['Alice', 'Bob', 'Charlie']
scores = [85, 92, 78]
for name, score in zip(names, scores):
    print(f"{name}: {score}分")

# 条件判断
age = 25
if age >= 18:
    print("成年人")
elif age >= 13:
    print("青少年")
else:
    print("儿童")

# 三元表达式（简洁的if-else）
category = "高" if score >= 90 else "中" if score >= 60 else "低"`
        },
        {
          emoji: '⚙️',
          title: '函数定义',
          desc: '封装可复用逻辑，减少重复代码',
          detail: '**典型业务场景**：封装数据清洗函数、指标计算函数\\n**易踩坑点**：可变对象作为默认参数、函数内修改全局变量\\n**可继续深挖**：装饰器、lambda表达式、*args和**kwargs',
          code: `# 基础函数定义
def calculate_gmv(price, quantity):
    """计算GMV"""
    return price * quantity

gmv = calculate_gmv(100, 50)  # 5000

# 默认参数
def calculate_discount(price, discount_rate=0.1):
    return price * (1 - discount_rate)

# 返回多个值
def get_statistics(data):
    return min(data), max(data), sum(data)/len(data)

min_val, max_val, avg_val = get_statistics([1, 2, 3, 4, 5])

# Lambda表达式（匿名函数）
square = lambda x: x**2
square(5)  # 25

# 常用于DataFrame操作
df['price_level'] = df['price'].apply(lambda x: '高' if x > 100 else '低')

# *args和**kwargs（可变参数）
def calculate_total(*prices):
    return sum(prices)

calculate_total(10, 20, 30, 40)  # 100`
        },
        {
          emoji: '📂',
          title: '文件操作',
          desc: '读写txt、csv、excel文件',
          detail: '**典型业务场景**：读取日志文件、导出数据报表\\n**易踩坑点**：文件未关闭导致资源泄漏，推荐使用with语句\\n**可继续深挖**：pathlib模块、os模块、文件编码问题',
          code: `# 读取文本文件
with open('data.txt', 'r', encoding='utf-8') as f:
    content = f.read()

# 写入文本文件
with open('output.txt', 'w', encoding='utf-8') as f:
    f.write("Hello World")

# 逐行读取（适合大文件）
with open('big_data.txt', 'r', encoding='utf-8') as f:
    for line in f:
        process(line.strip())

# CSV文件操作（推荐用pandas）
import pandas as pd
df = pd.read_csv('data.csv')
df.to_csv('output.csv', index=False)

# Excel文件操作
df = pd.read_excel('data.xlsx', sheet_name='Sheet1')
df.to_excel('output.xlsx', index=False, sheet_name='Result')

# 路径操作（推荐pathlib）
from pathlib import Path
file_path = Path('data/sales/2024/january.csv')
if file_path.exists():
    df = pd.read_csv(file_path)`
        }
      ]
    },
    {
      id: 'numpy',
      title: 'PART 03 NumPy数组计算',
      subtitle: '高性能数值计算的基石 —— 比Python原生快100倍',
      items: [
        {
          emoji: '🔢',
          title: 'NumPy数组创建 ☆',
          desc: 'ndarray是NumPy核心数据结构，支持向量化运算',
          detail: '**典型业务场景**：批量数值计算、矩阵运算、统计分析\\n**易踩坑点**：NumPy数组是固定类型，不能混用int和str\\n**可继续深挖**：数组广播（broadcasting）、花式索引',
          code: `import numpy as np

# 创建数组
arr1 = np.array([1, 2, 3, 4, 5])
arr2 = np.array([[1, 2, 3], [4, 5, 6]])  # 二维数组

# 常用创建函数
np.zeros((3, 4))  # 全0数组
np.ones((2, 3))   # 全1数组
np.arange(0, 10, 2)  # [0, 2, 4, 6, 8]
np.linspace(0, 1, 5)  # [0, 0.25, 0.5, 0.75, 1.0]

# 随机数组（数据分析常用）
np.random.rand(3, 4)  # 0-1之间的均匀分布
np.random.randn(3, 4)  # 标准正态分布
np.random.randint(0, 100, size=(3, 4))  # 随机整数

# 数组属性
arr = np.array([[1, 2, 3], [4, 5, 6]])
print(arr.shape)   # (2, 3) 形状
print(arr.dtype)   # int64 数据类型
print(arr.ndim)    # 2 维度
print(arr.size)    # 6 元素总数`
        },
        {
          emoji: '⚡',
          title: '向量化运算 ☆',
          desc: 'NumPy最大优势：批量运算，无需循环',
          detail: '**典型业务场景**：批量价格计算、折扣计算、指标归一化\\n**易踩坑点**：能用向量化就别用for循环，性能差距100倍以上\\n**可继续深挖**：ufunc通用函数、广播机制',
          code: `# ❌ 错误：使用Python循环（慢）
prices = [100, 200, 300, 400]
discounted = []
for price in prices:
    discounted.append(price * 0.8)

# ✅ 正确：NumPy向量化（快100倍）
prices = np.array([100, 200, 300, 400])
discounted = prices * 0.8  # [80, 160, 240, 320]

# 批量运算
arr = np.array([1, 2, 3, 4, 5])
arr + 10        # [11, 12, 13, 14, 15]
arr * 2         # [2, 4, 6, 8, 10]
arr ** 2        # [1, 4, 9, 16, 25]
arr > 3         # [False, False, False, True, True]

# 数组间运算
arr1 = np.array([1, 2, 3])
arr2 = np.array([4, 5, 6])
arr1 + arr2     # [5, 7, 9]
arr1 * arr2     # [4, 10, 18]

# 广播机制（不同形状数组运算）
matrix = np.array([[1, 2, 3], [4, 5, 6]])
vector = np.array([10, 20, 30])
matrix + vector  # [[11, 22, 33], [14, 25, 36]]`
        },
        {
          emoji: '📊',
          title: '统计函数',
          desc: '快速计算均值、方差、分位数等统计指标',
          detail: '**典型业务场景**：数据探索、异常值检测、描述性统计\\n**易踩坑点**：axis参数容易混淆（0是列，1是行）\\n**可继续深挖**：加权统计、移动窗口统计',
          code: `data = np.array([85, 92, 78, 95, 88, 76, 91, 89])

# 基础统计
data.mean()     # 平均值 86.75
data.std()      # 标准差 6.12
data.var()      # 方差 37.44
data.min()      # 最小值 76
data.max()      # 最大值 95
data.sum()      # 求和 694

# 分位数
np.percentile(data, 25)  # 25%分位数
np.percentile(data, 50)  # 中位数
np.percentile(data, 75)  # 75%分位数

# 二维数组统计（注意axis参数）
matrix = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
matrix.mean()           # 全局均值 5.0
matrix.mean(axis=0)     # 每列均值 [4, 5, 6]
matrix.mean(axis=1)     # 每行均值 [2, 5, 8]

# 条件统计
data[data > 85].mean()  # 大于85的数据的平均值
np.where(data > 85, '优秀', '良好')  # 条件替换`
        },
        {
          emoji: '🔍',
          title: '数组索引与切片',
          desc: '灵活提取数据子集',
          detail: '**典型业务场景**：提取特定行列、筛选数据、数据采样\\n**易踩坑点**：切片是视图不是副本，修改会影响原数组\\n**可继续深挖**：布尔索引、花式索引、ix_网格索引',
          code: `arr = np.array([10, 20, 30, 40, 50])

# 基础索引
arr[0]      # 10
arr[-1]     # 50
arr[1:4]    # [20, 30, 40]

# 二维数组索引
matrix = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
matrix[0, 1]     # 2 (第0行第1列)
matrix[1, :]     # [4, 5, 6] (第1行所有列)
matrix[:, 2]     # [3, 6, 9] (所有行第2列)
matrix[0:2, 1:3] # [[2, 3], [5, 6]]

# 布尔索引（重要！）
data = np.array([85, 92, 78, 95, 88, 76, 91, 89])
data[data > 85]          # [92, 95, 88, 91, 89]
data[(data > 80) & (data < 90)]  # [85, 88, 89]

# 花式索引
arr = np.array([10, 20, 30, 40, 50])
indices = [0, 2, 4]
arr[indices]  # [10, 30, 50]`
        }
      ]
    },
    {
      id: 'pandas',
      title: 'PART 04 Pandas数据处理',
      subtitle: '数据分析的瑞士军刀 —— 90%的数据处理用Pandas解决',
      items: [
        {
          emoji: '🐼',
          title: 'DataFrame与Series ☆',
          desc: 'Pandas两大核心数据结构：Series(一维)和DataFrame(二维表)',
          detail: '**典型业务场景**：读取CSV/Excel、数据表操作、业务指标计算\\n**易踩坑点**：DataFrame列名重复、索引错乱、链式赋值警告\\n**可继续深挖**：MultiIndex多级索引、分类数据类型Categorical',
          code: `import pandas as pd

# 创建Series
s = pd.Series([1, 2, 3, 4, 5], index=['a', 'b', 'c', 'd', 'e'])

# 创建DataFrame
data = {
    'user_id': [1001, 1002, 1003, 1004],
    'name': ['Alice', 'Bob', 'Charlie', 'David'],
    'age': [25, 30, 35, 28],
    'sales': [5000, 8000, 6000, 7000]
}
df = pd.DataFrame(data)

# 读取文件（最常用）
df = pd.read_csv('sales_data.csv')
df = pd.read_excel('sales_data.xlsx', sheet_name='Sheet1')

# 查看数据
df.head()      # 前5行
df.tail(10)    # 后10行
df.info()      # 数据类型和缺失值信息
df.describe()  # 数值列的统计摘要
df.shape       # (行数, 列数)
df.columns     # 列名
df.dtypes      # 每列数据类型

# 选择列
df['name']           # 单列（返回Series）
df[['name', 'age']]  # 多列（返回DataFrame）`
        },
        {
          emoji: '🔍',
          title: '数据筛选与索引 ☆',
          desc: 'loc、iloc、布尔索引 —— 数据分析师每天用100次',
          detail: '**典型业务场景**：筛选高价值用户、提取特定时间段数据、条件查询\\n**易踩坑点**：loc用标签，iloc用位置；链式索引会报SettingWithCopyWarning\\n**可继续深挖**：query()方法、eval()方法、at和iat快速访问',
          code: `# loc：基于标签的索引
df.loc[0]                    # 第0行
df.loc[0:5]                  # 0到5行
df.loc[:, 'name']            # name列
df.loc[0:5, ['name', 'age']] # 0-5行的name和age列

# iloc：基于位置的索引
df.iloc[0]       # 第0行
df.iloc[0:5]     # 0-4行（不包括5）
df.iloc[:, 0]    # 第0列
df.iloc[0:5, 0:3]  # 前5行前3列

# 布尔索引（最重要！）
df[df['age'] > 30]  # 年龄大于30的行
df[df['sales'] >= 7000]  # 销售额大于等于7000的行
df[(df['age'] > 25) & (df['sales'] > 6000)]  # 多条件与
df[(df['age'] < 25) | (df['sales'] > 8000)]  # 多条件或

# 字符串筛选
df[df['name'].str.contains('A')]  # 名字包含A
df[df['name'].str.startswith('B')]  # 名字以B开头
df[df['name'].isin(['Alice', 'Bob'])]  # 名字在列表中

# query方法（更简洁）
df.query('age > 30 and sales > 6000')
df.query('name == "Alice" or sales > 7500')`
        },
        {
          emoji: '🔧',
          title: '数据清洗 ☆',
          desc: '处理缺失值、重复值、异常值 —— 数据分析的第一步',
          detail: '**典型业务场景**：清洗脏数据、填充缺失值、去重\\n**易踩坑点**：inplace=True会修改原DataFrame，谨慎使用\\n**可继续深挖**：插值方法interpolate()、异常值检测IQR方法',
          code: `# 缺失值处理
df.isnull().sum()       # 每列缺失值数量
df.dropna()             # 删除包含缺失值的行
df.dropna(subset=['age'])  # 删除age列为空的行
df.fillna(0)            # 用0填充缺失值
df['age'].fillna(df['age'].mean())  # 用均值填充

# 重复值处理
df.duplicated().sum()   # 重复行数量
df.drop_duplicates()    # 删除重复行
df.drop_duplicates(subset=['user_id'], keep='first')  # 基于user_id去重

# 数据类型转换
df['age'] = df['age'].astype(int)
df['date'] = pd.to_datetime(df['date'])

# 替换值
df['gender'].replace({'M': '男', 'F': '女'})
df['sales'].replace(0, np.nan)  # 0替换为NaN

# 重命名列
df.rename(columns={'old_name': 'new_name'})

# 删除列
df.drop(columns=['col1', 'col2'])
df.drop(['col1', 'col2'], axis=1)  # 等价写法`
        },
        {
          emoji: '📊',
          title: 'GroupBy分组聚合 ☆',
          desc: 'SQL的GROUP BY在Pandas中的实现 —— 业务分析核心',
          detail: '**典型业务场景**：分地区统计销售额、按时间聚合数据、用户分群分析\\n**易踩坑点**：聚合后索引会变，需要reset_index()\\n**可继续深挖**：transform()、filter()、agg()多种聚合',
          code: `# 基础分组聚合
df.groupby('category')['sales'].sum()  # 按类别求销售额总和
df.groupby('region')['amount'].mean()  # 按地区求平均金额

# 多列分组
df.groupby(['region', 'category'])['sales'].sum()

# 多种聚合
df.groupby('category').agg({
    'sales': 'sum',
    'quantity': 'sum',
    'price': 'mean'
})

# 自定义聚合函数
df.groupby('category')['sales'].agg(['sum', 'mean', 'count', 'max'])

# 重置索引（重要！）
result = df.groupby('category')['sales'].sum().reset_index()

# transform（保持原DataFrame形状）
df['sales_pct'] = df.groupby('category')['sales'].transform(lambda x: x / x.sum())

# 实战案例：计算每个用户的消费金额占比
df['user_sales_pct'] = df.groupby('user_id')['amount'].transform(lambda x: x / x.sum() * 100)`
        },
        {
          emoji: '🔗',
          title: '数据合并（merge/join）☆',
          desc: 'SQL的JOIN在Pandas中的实现 —— 多表关联分析',
          detail: '**典型业务场景**：用户表关联订单表、产品表关联销售表\\n**易踩坑点**：注意left/right/inner/outer的区别，数据膨胀问题\\n**可继续深挖**：concat()纵向拼接、join()方法',
          code: `# Inner Join（内连接，两表都有的记录）
pd.merge(df_users, df_orders, on='user_id', how='inner')

# Left Join（左连接，保留左表所有记录）
pd.merge(df_users, df_orders, on='user_id', how='left')

# 多键关联
pd.merge(df1, df2, on=['key1', 'key2'])

# 列名不同时关联
pd.merge(df1, df2, left_on='user_id', right_on='uid')

# 纵向拼接（合并多个DataFrame）
pd.concat([df1, df2, df3], ignore_index=True)

# 实战案例：用户订单分析
users = pd.DataFrame({
    'user_id': [1, 2, 3],
    'name': ['Alice', 'Bob', 'Charlie']
})

orders = pd.DataFrame({
    'order_id': [101, 102, 103],
    'user_id': [1, 1, 2],
    'amount': [100, 200, 150]
})

# 关联并统计每个用户的订单数和总金额
result = pd.merge(users, orders, on='user_id', how='left')
user_stats = result.groupby(['user_id', 'name']).agg({
    'order_id': 'count',
    'amount': 'sum'
}).rename(columns={'order_id': 'order_count', 'amount': 'total_amount'})`
        },
        {
          emoji: '📅',
          title: '时间序列处理',
          desc: '日期时间数据处理 —— 业务分析必备',
          detail: '**典型业务场景**：按日/周/月聚合数据、计算同比环比、时间窗口分析\\n**易踩坑点**：时区问题、日期格式解析失败\\n**可继续深挖**：resample()重采样、rolling()移动窗口、时间偏移',
          code: `# 日期转换
df['date'] = pd.to_datetime(df['date'])
df['date'] = pd.to_datetime(df['date'], format='%Y-%m-%d')

# 提取日期组件
df['year'] = df['date'].dt.year
df['month'] = df['date'].dt.month
df['day'] = df['date'].dt.day
df['weekday'] = df['date'].dt.dayofweek  # 0=Monday
df['week'] = df['date'].dt.isocalendar().week

# 日期筛选
df[df['date'] >= '2024-01-01']
df[(df['date'] >= '2024-01-01') & (df['date'] <= '2024-01-31')]

# 按时间聚合
df.set_index('date').resample('D').sum()   # 按日聚合
df.set_index('date').resample('W').mean()  # 按周聚合
df.set_index('date').resample('M').sum()   # 按月聚合

# 移动窗口（计算移动平均）
df['sales_ma7'] = df.set_index('date')['sales'].rolling(window=7).mean()

# 实战：计算同比增长率
df_monthly = df.set_index('date').resample('M').sum()
df_monthly['yoy_growth'] = df_monthly['sales'].pct_change(periods=12) * 100`
        }
      ]
    },
    {
      id: 'matplotlib-seaborn',
      title: 'PART 05 Matplotlib & Seaborn可视化',
      subtitle: '一图胜千言 —— 让数据说话',
      items: [
        {
          emoji: '📊',
          title: 'Matplotlib基础 ☆',
          desc: 'Python最基础的绘图库，高度可定制',
          detail: '**典型业务场景**：绘制折线图、柱状图、散点图、饼图\\n**易踩坑点**：中文显示乱码、图例位置、坐标轴刻度\\n**可继续深挖**：subplots子图布局、自定义样式、动画',
          code: `import matplotlib.pyplot as plt
import numpy as np

# 解决中文显示问题
plt.rcParams['font.sans-serif'] = ['SimHei']  # 黑体
plt.rcParams['axes.unicode_minus'] = False

# 折线图
x = np.arange(1, 13)
sales = [100, 120, 110, 130, 150, 140, 160, 180, 170, 190, 200, 210]
plt.figure(figsize=(10, 6))
plt.plot(x, sales, marker='o', linewidth=2, color='#19bcc8')
plt.title('2024年月度销售额趋势', fontsize=16, fontweight='bold')
plt.xlabel('月份', fontsize=12)
plt.ylabel('销售额（万元）', fontsize=12)
plt.grid(True, alpha=0.3)
plt.show()

# 柱状图
categories = ['电子产品', '服装', '食品', '图书', '家居']
values = [450, 320, 280, 150, 200]
plt.figure(figsize=(8, 6))
plt.bar(categories, values, color='#19bcc8', alpha=0.8)
plt.title('各品类销售额对比', fontsize=16)
plt.ylabel('销售额（万元）', fontsize=12)
plt.xticks(rotation=45)
plt.tight_layout()
plt.show()

# 散点图
x = np.random.randn(100)
y = 2 * x + np.random.randn(100)
plt.figure(figsize=(8, 6))
plt.scatter(x, y, alpha=0.6, s=50, color='#19bcc8')
plt.title('用户活跃度 vs 消费金额', fontsize=16)
plt.xlabel('活跃度', fontsize=12)
plt.ylabel('消费金额', fontsize=12)
plt.show()

# 饼图
labels = ['直销', '代理商', '电商', '其他']
sizes = [35, 25, 30, 10]
colors = ['#19bcc8', '#ff6b6b', '#ffd93d', '#6bcf7f']
plt.figure(figsize=(8, 6))
plt.pie(sizes, labels=labels, autopct='%1.1f%%', colors=colors, startangle=90)
plt.title('销售渠道占比', fontsize=16)
plt.axis('equal')
plt.show()`
        },
        {
          emoji: '🎨',
          title: 'Seaborn高级可视化 ☆',
          desc: '基于Matplotlib的高级可视化库，样式更美观',
          detail: '**典型业务场景**：数据分布分析、相关性分析、分组对比\\n**易踩坑点**：需要DataFrame格式数据、hue参数使用\\n**可继续深挖**：FacetGrid多子图、PairGrid配对图',
          code: `import seaborn as sns
import pandas as pd

# 设置样式
sns.set_style("whitegrid")
sns.set_palette("husl")

# 数据准备
df = pd.DataFrame({
    'category': ['A', 'B', 'C', 'D', 'E'] * 20,
    'value': np.random.randn(100) * 10 + 50,
    'region': np.random.choice(['北区', '南区'], 100)
})

# 箱线图（查看分布和异常值）
plt.figure(figsize=(10, 6))
sns.boxplot(data=df, x='category', y='value', hue='region')
plt.title('各品类销售额分布（分地区）', fontsize=16)
plt.show()

# 小提琴图（更详细的分布）
plt.figure(figsize=(10, 6))
sns.violinplot(data=df, x='category', y='value')
plt.title('各品类销售额分布', fontsize=16)
plt.show()

# 热力图（相关性分析）
data = pd.DataFrame(np.random.randn(10, 5), 
                    columns=['销售额', '访问量', '转化率', '客单价', '复购率'])
plt.figure(figsize=(8, 6))
sns.heatmap(data.corr(), annot=True, cmap='coolwarm', center=0,
            linewidths=1, square=True)
plt.title('业务指标相关性矩阵', fontsize=16)
plt.show()

# 分组柱状图
plt.figure(figsize=(10, 6))
sns.barplot(data=df, x='category', y='value', hue='region')
plt.title('各品类销售额对比（分地区）', fontsize=16)
plt.show()

# 回归图（趋势分析）
plt.figure(figsize=(8, 6))
sns.regplot(data=df, x='value', y=df['value'] * 1.5 + np.random.randn(100) * 5)
plt.title('销售额 vs 利润 回归分析', fontsize=16)
plt.show()`
        },
        {
          emoji: '📈',
          title: '常用图表速查',
          desc: '数据分析最常用的10种图表及应用场景',
          detail: '**典型业务场景**：根据数据类型和分析目标选择合适的图表\\n**易踩坑点**：图表选择不当导致信息传达失真\\n**可继续深挖**：Plotly交互式图表、Pyecharts',
          code: `# 1. 折线图 - 趋势分析
df.plot(x='date', y='sales', kind='line', figsize=(10, 6))

# 2. 柱状图 - 类别对比
df.plot(x='category', y='value', kind='bar', figsize=(8, 6))

# 3. 水平柱状图 - 排名展示
df.plot(x='name', y='score', kind='barh', figsize=(8, 6))

# 4. 散点图 - 相关性分析
df.plot(x='age', y='income', kind='scatter', figsize=(8, 6))

# 5. 直方图 - 数据分布
df['age'].plot(kind='hist', bins=20, figsize=(8, 6))

# 6. 饼图 - 占比分析
df.groupby('category')['value'].sum().plot(kind='pie', figsize=(8, 8))

# 7. 箱线图 - 异常值检测
df.boxplot(column='sales', by='region', figsize=(10, 6))

# 8. 面积图 - 累积趋势
df.plot(x='date', y=['产品A', '产品B', '产品C'], kind='area', 
        stacked=True, figsize=(10, 6))

# 9. 多子图对比
fig, axes = plt.subplots(2, 2, figsize=(12, 10))
df.plot(ax=axes[0, 0], x='date', y='sales', kind='line')
df.plot(ax=axes[0, 1], x='category', y='value', kind='bar')
df.plot(ax=axes[1, 0], x='age', y='income', kind='scatter')
df['age'].plot(ax=axes[1, 1], kind='hist', bins=20)
plt.tight_layout()
plt.show()

# 10. 保存图表
plt.savefig('sales_analysis.png', dpi=300, bbox_inches='tight')`
        }
      ]
    },
    {
      id: 'data-cleaning',
      title: 'PART 06 数据清洗进阶',
      subtitle: '数据质量决定分析质量 —— 80%时间花在数据清洗',
      items: [
        {
          emoji: '🧹',
          title: '缺失值处理策略 ☆',
          desc: '不同场景下的缺失值处理方法',
          detail: '**典型业务场景**：用户信息缺失、订单金额缺失、时间序列断点\\n**易踩坑点**：盲目删除缺失值导致样本量不足、填充方法不当\\n**可继续深挖**：MICE多重插补、KNN插补',
          code: `import pandas as pd
import numpy as np

# 查看缺失值情况
df.isnull().sum()
df.isnull().sum() / len(df) * 100  # 缺失率

# 可视化缺失值模式
import missingno as msno
msno.matrix(df)  # 缺失值矩阵图
msno.heatmap(df)  # 缺失值相关性热力图

# 1. 删除策略（缺失率<5%）
df.dropna(subset=['user_id'])  # 删除关键字段缺失的行
df.dropna(thresh=10)  # 保留至少10个非空值的行

# 2. 填充策略 - 数值型
df['age'].fillna(df['age'].mean())    # 均值填充
df['income'].fillna(df['income'].median())  # 中位数填充（有异常值时）
df['sales'].fillna(df['sales'].mode()[0])  # 众数填充

# 3. 填充策略 - 分组填充（更合理）
df['age'] = df.groupby('city')['age'].transform(
    lambda x: x.fillna(x.mean())
)

# 4. 填充策略 - 类别型
df['category'].fillna('未知')
df['region'].fillna(df['region'].mode()[0])

# 5. 前向/后向填充（时间序列）
df['sales'].fillna(method='ffill')  # 用前一个值填充
df['sales'].fillna(method='bfill')  # 用后一个值填充

# 6. 插值填充（时间序列）
df['sales'].interpolate(method='linear')  # 线性插值
df['sales'].interpolate(method='polynomial', order=2)  # 多项式插值

# 7. 标记缺失值（保留信息）
df['age_missing'] = df['age'].isnull().astype(int)
df['age'].fillna(df['age'].median())`
        },
        {
          emoji: '🔍',
          title: '异常值检测与处理 ☆',
          desc: 'IQR、Z-score、业务规则三大方法',
          detail: '**典型业务场景**：订单金额异常、用户年龄异常、销量突增\\n**易踩坑点**：误删正常极值、阈值设置不合理\\n**可继续深挖**：孤立森林、DBSCAN聚类检测',
          code: `# 1. IQR方法（四分位距）- 最常用
Q1 = df['sales'].quantile(0.25)
Q3 = df['sales'].quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR

# 标记异常值
df['is_outlier'] = (df['sales'] < lower_bound) | (df['sales'] > upper_bound)

# 删除异常值
df_clean = df[(df['sales'] >= lower_bound) & (df['sales'] <= upper_bound)]

# 2. Z-score方法（标准差）
from scipy import stats
df['z_score'] = np.abs(stats.zscore(df['sales']))
df_clean = df[df['z_score'] < 3]  # 保留3个标准差内的数据

# 3. 业务规则
df_clean = df[
    (df['age'] >= 0) & (df['age'] <= 120) &  # 年龄合理范围
    (df['price'] > 0) &  # 价格必须为正
    (df['quantity'] > 0) & (df['quantity'] <= 1000)  # 数量合理范围
]

# 4. 百分位数截断（Winsorization）
lower = df['sales'].quantile(0.01)
upper = df['sales'].quantile(0.99)
df['sales_clean'] = df['sales'].clip(lower, upper)

# 5. 可视化检测
import seaborn as sns
plt.figure(figsize=(12, 4))
plt.subplot(1, 3, 1)
sns.boxplot(y=df['sales'])
plt.title('箱线图检测异常值')

plt.subplot(1, 3, 2)
df['sales'].hist(bins=50)
plt.title('直方图检测异常值')

plt.subplot(1, 3, 3)
stats.probplot(df['sales'], dist="norm", plot=plt)
plt.title('Q-Q图检测异常值')
plt.tight_layout()
plt.show()`
        },
        {
          emoji: '🔄',
          title: '数据类型转换',
          desc: '正确的数据类型是分析的基础',
          detail: '**典型业务场景**：日期字符串转日期、数值字符串转数字、类别编码\\n**易踩坑点**：类型转换失败、精度丢失、时区问题\\n**可继续深挖**：Categorical数据类型节省内存',
          code: `# 1. 数值类型转换
df['price'] = pd.to_numeric(df['price'], errors='coerce')  # 转换失败变NaN
df['quantity'] = df['quantity'].astype(int)

# 2. 日期类型转换
df['date'] = pd.to_datetime(df['date'])
df['date'] = pd.to_datetime(df['date'], format='%Y-%m-%d')
df['date'] = pd.to_datetime(df['date'], errors='coerce')

# 3. 字符串类型
df['user_id'] = df['user_id'].astype(str)

# 4. 类别类型（节省内存）
df['category'] = df['category'].astype('category')

# 5. 布尔类型
df['is_vip'] = df['is_vip'].astype(bool)

# 6. 批量转换
df = df.astype({
    'user_id': str,
    'age': int,
    'sales': float,
    'category': 'category',
    'is_active': bool
})

# 7. 处理千分位、百分号
df['amount'] = df['amount'].str.replace(',', '').astype(float)
df['rate'] = df['rate'].str.rstrip('%').astype(float) / 100

# 8. 优化内存占用
def reduce_mem_usage(df):
    for col in df.columns:
        col_type = df[col].dtype
        if col_type != object:
            c_min = df[col].min()
            c_max = df[col].max()
            if str(col_type)[:3] == 'int':
                if c_min > np.iinfo(np.int8).min and c_max < np.iinfo(np.int8).max:
                    df[col] = df[col].astype(np.int8)
                elif c_min > np.iinfo(np.int16).min and c_max < np.iinfo(np.int16).max:
                    df[col] = df[col].astype(np.int16)
    return df`
        }
      ]
    },
    {
      id: 'eda',
      title: 'PART 07 探索性数据分析（EDA）',
      subtitle: '了解你的数据 —— 分析的第一步',
      items: [
        {
          emoji: '🔍',
          title: 'EDA核心步骤 ☆',
          desc: '数据概览 → 单变量分析 → 双变量分析 → 多变量分析',
          detail: '**典型业务场景**：新数据集初步探索、异常检测、特征选择\\n**易踩坑点**：跳过EDA直接建模、忽略数据分布\\n**可继续深挖**：pandas-profiling自动化EDA',
          code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# 1. 数据概览
print("数据维度:", df.shape)
print("\\n数据类型:\\n", df.dtypes)
print("\\n前5行:\\n", df.head())
print("\\n描述统计:\\n", df.describe())
print("\\n缺失值:\\n", df.isnull().sum())

# 2. 单变量分析 - 数值型
# 直方图
df['age'].hist(bins=30, figsize=(8, 6))
plt.title('年龄分布')
plt.show()

# 箱线图
df.boxplot(column='sales', figsize=(6, 8))
plt.title('销售额箱线图')
plt.show()

# 统计摘要
print("均值:", df['sales'].mean())
print("中位数:", df['sales'].median())
print("标准差:", df['sales'].std())
print("偏度:", df['sales'].skew())
print("峰度:", df['sales'].kurt())

# 3. 单变量分析 - 类别型
df['category'].value_counts()
df['category'].value_counts().plot(kind='bar', figsize=(8, 6))
plt.title('各类别数量分布')
plt.show()

# 4. 双变量分析 - 数值 vs 数值
df.plot(x='age', y='income', kind='scatter', figsize=(8, 6))
plt.title('年龄 vs 收入')
plt.show()

# 相关系数
df[['age', 'income', 'sales']].corr()

# 5. 双变量分析 - 类别 vs 数值
df.groupby('category')['sales'].mean().plot(kind='bar', figsize=(8, 6))
plt.title('各类别平均销售额')
plt.show()

sns.boxplot(data=df, x='category', y='sales', figsize=(10, 6))
plt.title('各类别销售额分布')
plt.show()

# 6. 多变量分析 - 相关性矩阵
plt.figure(figsize=(10, 8))
sns.heatmap(df.corr(), annot=True, cmap='coolwarm', center=0)
plt.title('特征相关性矩阵')
plt.show()

# 7. 自动化EDA（推荐！）
# pip install pandas-profiling
from pandas_profiling import ProfileReport
profile = ProfileReport(df, title="数据分析报告")
profile.to_file("eda_report.html")`
        },
        {
          emoji: '📊',
          title: '数据分布检验',
          desc: '正态性检验、偏度峰度分析',
          detail: '**典型业务场景**：选择统计检验方法、特征工程前的分布分析\\n**易踩坑点**：假设数据符合正态分布、忽略长尾分布\\n**可继续深挖**：Box-Cox变换、Yeo-Johnson变换',
          code: `from scipy import stats
import matplotlib.pyplot as plt

# 1. 正态性检验
# Shapiro-Wilk检验
statistic, p_value = stats.shapiro(df['sales'])
print(f"Shapiro-Wilk检验: p-value={p_value:.4f}")
if p_value > 0.05:
    print("数据符合正态分布")
else:
    print("数据不符合正态分布")

# 2. Q-Q图（可视化正态性）
plt.figure(figsize=(8, 6))
stats.probplot(df['sales'], dist="norm", plot=plt)
plt.title('Q-Q图检验正态性')
plt.show()

# 3. 偏度和峰度
skewness = df['sales'].skew()
kurtosis = df['sales'].kurt()
print(f"偏度: {skewness:.2f}")  # >0右偏，<0左偏
print(f"峰度: {kurtosis:.2f}")  # >0尖峰，<0平峰

# 4. 数据变换（处理偏态分布）
# 对数变换
df['sales_log'] = np.log1p(df['sales'])

# 平方根变换
df['sales_sqrt'] = np.sqrt(df['sales'])

# Box-Cox变换
df['sales_boxcox'], lambda_param = stats.boxcox(df['sales'] + 1)

# 对比变换前后
fig, axes = plt.subplots(2, 2, figsize=(12, 10))
df['sales'].hist(bins=50, ax=axes[0, 0])
axes[0, 0].set_title('原始数据')
df['sales_log'].hist(bins=50, ax=axes[0, 1])
axes[0, 1].set_title('对数变换')
df['sales_sqrt'].hist(bins=50, ax=axes[1, 0])
axes[1, 0].set_title('平方根变换')
df['sales_boxcox'].hist(bins=50, ax=axes[1, 1])
axes[1, 1].set_title('Box-Cox变换')
plt.tight_layout()
plt.show()`
        }
      ]
    },
    {
      id: 'sql-integration',
      title: 'PART 08 Python × SQL集成',
      subtitle: 'Python连接数据库 —— 数据分析的数据来源',
      items: [
        {
          emoji: '🔗',
          title: 'PyMySQL连接MySQL ☆',
          desc: 'Python连接MySQL数据库，执行SQL查询',
          detail: '**典型业务场景**：从数据库读取数据、写入分析结果\\n**易踩坑点**：SQL注入风险、连接未关闭、编码问题\\n**可继续深挖**：连接池、事务管理、ORM框架（SQLAlchemy）',
          code: `import pymysql
import pandas as pd

# 1. 建立连接
conn = pymysql.connect(
    host='localhost',
    user='root',
    password='your_password',
    database='sales_db',
    charset='utf8mb4'
)

# 2. 执行查询（返回DataFrame）
sql = "SELECT * FROM orders WHERE order_date >= '2024-01-01'"
df = pd.read_sql(sql, conn)

# 3. 参数化查询（防止SQL注入）
sql = "SELECT * FROM users WHERE user_id = %s"
df = pd.read_sql(sql, conn, params=(1001,))

# 4. 写入数据库
df.to_sql('analysis_result', conn, if_exists='replace', index=False)

# 5. 使用with语句（自动关闭连接）
with pymysql.connect(**db_config) as conn:
    df = pd.read_sql("SELECT * FROM orders", conn)

# 6. SQLAlchemy方式（推荐）
from sqlalchemy import create_engine
engine = create_engine('mysql+pymysql://user:pass@localhost/db_name')
df = pd.read_sql("SELECT * FROM orders", engine)
df.to_sql('result', engine, if_exists='append', index=False)

# 7. 批量插入（高效）
from sqlalchemy import create_engine
engine = create_engine('mysql+pymysql://user:pass@localhost/db')
df.to_sql('table_name', engine, if_exists='append', index=False, 
          method='multi', chunksize=1000)`
        }
      ]
    },
    {
      id: 'automation',
      title: 'PART 09 自动化脚本',
      subtitle: '让Python为你工作 —— 解放双手',
      items: [
        {
          emoji: '⚡',
          title: '自动化数据报表生成 ☆',
          desc: '定时从数据库提取数据，生成Excel报表并发送邮件',
          detail: '**典型业务场景**：每日销售报表、周报、月报自动化\\n**易踩坑点**：时区问题、文件路径、邮件发送失败\\n**可继续深挖**：APScheduler定时任务、日志记录',
          code: `import pandas as pd
import pymysql
from datetime import datetime, timedelta
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders

# 1. 从数据库获取数据
def get_sales_data(start_date, end_date):
    conn = pymysql.connect(host='localhost', user='root', 
                          password='pass', database='sales_db')
    sql = f"""
    SELECT date, category, SUM(amount) as sales
    FROM orders
    WHERE date BETWEEN '{start_date}' AND '{end_date}'
    GROUP BY date, category
    """
    df = pd.read_sql(sql, conn)
    conn.close()
    return df

# 2. 数据分析
def analyze_data(df):
    summary = df.groupby('category')['sales'].agg(['sum', 'mean', 'count'])
    summary = summary.sort_values('sum', ascending=False)
    return summary

# 3. 生成Excel报表
def generate_report(df, summary, filename):
    with pd.ExcelWriter(filename, engine='openpyxl') as writer:
        df.to_excel(writer, sheet_name='明细数据', index=False)
        summary.to_excel(writer, sheet_name='汇总分析')
    return filename

# 4. 发送邮件
def send_email(to_email, subject, body, attachment_path):
    from_email = 'your_email@gmail.com'
    password = 'your_app_password'
    
    msg = MIMEMultipart()
    msg['From'] = from_email
    msg['To'] = to_email
    msg['Subject'] = subject
    msg.attach(MIMEText(body, 'plain', 'utf-8'))
    
    # 附件
    with open(attachment_path, 'rb') as f:
        part = MIMEBase('application', 'octet-stream')
        part.set_payload(f.read())
        encoders.encode_base64(part)
        part.add_header('Content-Disposition', 
                       f'attachment; filename={attachment_path}')
        msg.attach(part)
    
    # 发送
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(from_email, password)
    server.send_message(msg)
    server.quit()

# 5. 主流程
def main():
    today = datetime.now()
    yesterday = today - timedelta(days=1)
    
    # 获取数据
    df = get_sales_data(yesterday, today)
    summary = analyze_data(df)
    
    # 生成报表
    filename = f'销售日报_{yesterday.strftime("%Y%m%d")}.xlsx'
    generate_report(df, summary, filename)
    
    # 发送邮件
    send_email('boss@company.com', 
              f'销售日报 {yesterday.strftime("%Y-%m-%d")}',
              '附件是今日销售数据分析报告，请查收。',
              filename)
    
    print(f"报表生成并发送成功: {filename}")

if __name__ == '__main__':
    main()`
        }
      ]
    },
    {
      id: 'best-practices',
      title: 'PART 10 最佳实践',
      subtitle: '写出优雅高效的Python代码',
      items: [
        {
          emoji: '✨',
          title: 'Pandas性能优化 ☆',
          desc: '向量化、分块处理、数据类型优化',
          detail: '**典型业务场景**：处理大数据集（>1GB）、提升代码运行速度\\n**易踩坑点**：循环遍历DataFrame、频繁复制数据\\n**可继续深挖**：Dask、Vaex大数据处理',
          code: `# ❌ 慢：循环遍历DataFrame
for idx, row in df.iterrows():
    df.loc[idx, 'new_col'] = row['a'] + row['b']

# ✅ 快：向量化运算（快100倍）
df['new_col'] = df['a'] + df['b']

# ❌ 慢：逐行append
result = pd.DataFrame()
for chunk in data_chunks:
    result = result.append(chunk)

# ✅ 快：一次性concat
result = pd.concat(data_chunks, ignore_index=True)

# 优化数据类型节省内存
df['category'] = df['category'].astype('category')
df['int_col'] = df['int_col'].astype('int32')  # int64→int32

# 分块读取大文件
chunks = []
for chunk in pd.read_csv('big_file.csv', chunksize=10000):
    processed = process(chunk)
    chunks.append(processed)
df = pd.concat(chunks)

# 使用query方法（更快）
df.query('age > 30 and sales > 5000')  # 比布尔索引快`
        },
        {
          emoji: '🔒',
          title: '代码规范与可维护性',
          desc: '命名规范、注释、异常处理',
          detail: '**典型业务场景**：团队协作、代码审查、长期维护\\n**易踩坑点**：变量名不清晰、缺少异常处理、硬编码\\n**可继续深挖**：PEP 8规范、类型注解、单元测试',
          code: `# 1. 命名规范
# ❌ 不好
df1 = pd.read_csv('data.csv')
x = df1['sales'].sum()

# ✅ 好
sales_data = pd.read_csv('sales_data.csv')
total_sales = sales_data['sales'].sum()

# 2. 异常处理
try:
    df = pd.read_csv('data.csv')
except FileNotFoundError:
    print("文件不存在")
    df = pd.DataFrame()
except Exception as e:
    print(f"读取失败: {e}")
    df = pd.DataFrame()

# 3. 配置外置
# config.py
DB_CONFIG = {
    'host': 'localhost',
    'user': 'root',
    'password': 'pass',
    'database': 'sales_db'
}

# 4. 函数文档
def calculate_growth_rate(current, previous):
    """
    计算增长率
    
    Parameters:
    -----------
    current : float
        当前值
    previous : float
        上期值
    
    Returns:
    --------
    float : 增长率（%）
    """
    if previous == 0:
        return 0
    return (current - previous) / previous * 100

# 5. 日志记录
import logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

logger.info("开始处理数据")
logger.warning("发现异常值")
logger.error("处理失败")`
        }
      ]
    },
    {
      id: 'common-mistakes',
      title: 'PART 11 常见错误避坑',
      subtitle: '前人踩过的坑，你不用再踩',
      items: [
        {
          emoji: '⚠️',
          title: 'Pandas常见错误 ☆',
          desc: 'SettingWithCopyWarning、链式索引、inplace陷阱',
          detail: '**典型业务场景**：数据修改、筛选后赋值\\n**易踩坑点**：警告不处理导致数据未更新\\n**可继续深挖**：Pandas底层机制、视图vs副本',
          code: `# 1. SettingWithCopyWarning
# ❌ 错误：链式索引
df[df['age'] > 30]['sales'] = 0  # 警告！可能不生效

# ✅ 正确：使用loc
df.loc[df['age'] > 30, 'sales'] = 0

# 2. inplace陷阱
# ❌ 错误：以为inplace会返回结果
result = df.dropna(inplace=True)  # result是None！

# ✅ 正确：不使用inplace
result = df.dropna()

# 3. 副本vs视图
df_subset = df[df['age'] > 30]  # 这是副本还是视图？不确定！
df_subset['new_col'] = 1  # 可能触发警告

# ✅ 正确：显式复制
df_subset = df[df['age'] > 30].copy()
df_subset['new_col'] = 1

# 4. 数据类型混淆
df['age'] = df['age'] + '岁'  # ❌ 会变成object类型
df['age_label'] = df['age'].astype(str) + '岁'  # ✅

# 5. groupby后忘记reset_index
grouped = df.groupby('category')['sales'].sum()
# ❌ grouped是Series，category变成了索引
# ✅ 转回DataFrame
grouped = df.groupby('category')['sales'].sum().reset_index()`
        }
      ]
    },
    {
      id: 'templates',
      title: 'PART 12 代码模板库',
      subtitle: '拿来即用的代码模板 —— 快速开发',
      items: [
        {
          emoji: '📦',
          title: '数据分析全流程模板',
          desc: '从数据读取到结果输出的完整流程',
          detail: '**典型业务场景**：新项目快速启动、标准化分析流程\\n**易踩坑点**：忘记错误处理、缺少数据验证\\n**可继续深挖**：Cookiecutter项目模板',
          code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime

# ================== 1. 配置 ==================
plt.rcParams['font.sans-serif'] = ['SimHei']
sns.set_style("whitegrid")

# ================== 2. 数据读取 ==================
def load_data(file_path):
    try:
        df = pd.read_csv(file_path)
        print(f"✅ 数据加载成功: {df.shape[0]}行 × {df.shape[1]}列")
        return df
    except Exception as e:
        print(f"❌ 数据加载失败: {e}")
        return None

# ================== 3. 数据清洗 ==================
def clean_data(df):
    df_clean = df.copy()
    
    # 删除重复值
    df_clean = df_clean.drop_duplicates()
    
    # 处理缺失值
    df_clean['age'].fillna(df_clean['age'].median(), inplace=True)
    df_clean.dropna(subset=['user_id'], inplace=True)
    
    # 异常值处理
    Q1 = df_clean['sales'].quantile(0.25)
    Q3 = df_clean['sales'].quantile(0.75)
    IQR = Q3 - Q1
    df_clean = df_clean[
        (df_clean['sales'] >= Q1 - 1.5*IQR) & 
        (df_clean['sales'] <= Q3 + 1.5*IQR)
    ]
    
    print(f"✅ 数据清洗完成: {df_clean.shape[0]}行保留")
    return df_clean

# ================== 4. 探索性分析 ==================
def explore_data(df):
    print("\\n" + "="*50)
    print("数据概览")
    print("="*50)
    print(df.info())
    print("\\n描述统计:\\n", df.describe())
    
    # 可视化
    fig, axes = plt.subplots(2, 2, figsize=(12, 10))
    df['age'].hist(bins=30, ax=axes[0,0])
    axes[0,0].set_title('年龄分布')
    df['sales'].hist(bins=30, ax=axes[0,1])
    axes[0,1].set_title('销售额分布')
    df.groupby('category')['sales'].sum().plot(kind='bar', ax=axes[1,0])
    axes[1,0].set_title('各类别销售额')
    df.plot(x='age', y='sales', kind='scatter', ax=axes[1,1])
    axes[1,1].set_title('年龄 vs 销售额')
    plt.tight_layout()
    plt.savefig('eda_report.png', dpi=300)
    print("\\n✅ EDA报告已保存: eda_report.png")

# ================== 5. 数据分析 ==================
def analyze_data(df):
    # 分组统计
    summary = df.groupby('category').agg({
        'sales': ['sum', 'mean', 'count'],
        'quantity': 'sum'
    }).round(2)
    
    # 时间序列分析
    df['date'] = pd.to_datetime(df['date'])
    daily_sales = df.groupby('date')['sales'].sum()
    
    return summary, daily_sales

# ================== 6. 结果输出 ==================
def export_results(summary, daily_sales, output_file):
    with pd.ExcelWriter(output_file, engine='openpyxl') as writer:
        summary.to_excel(writer, sheet_name='分类汇总')
        daily_sales.to_excel(writer, sheet_name='日销售额')
    print(f"\\n✅ 分析结果已导出: {output_file}")

# ================== 7. 主流程 ==================
if __name__ == '__main__':
    # 加载数据
    df = load_data('sales_data.csv')
    
    if df is not None:
        # 清洗数据
        df_clean = clean_data(df)
        
        # 探索分析
        explore_data(df_clean)
        
        # 数据分析
        summary, daily_sales = analyze_data(df_clean)
        
        # 导出结果
        export_results(summary, daily_sales, 
                      f'分析报告_{datetime.now().strftime("%Y%m%d")}.xlsx')
        
        print("\\n🎉 分析完成！")`
        }
      ]
    },
    {
      id: 'advanced-libs',
      title: 'PART 13 进阶库推荐',
      subtitle: '更强大的数据分析工具',
      items: [
        {
          emoji: '🚀',
          title: '进阶库速览',
          desc: 'Plotly、Statsmodels、Scikit-learn等',
          detail: '**典型业务场景**：交互式可视化、统计建模、机器学习\\n**易踩坑点**：库之间版本冲突\\n**可继续深挖**：各库官方文档',
          code: `# 1. Plotly - 交互式可视化
import plotly.express as px
fig = px.line(df, x='date', y='sales', title='销售趋势')
fig.show()

# 2. Statsmodels - 统计分析
from statsmodels.formula.api import ols
model = ols('sales ~ age + income', data=df).fit()
print(model.summary())

# 3. Scikit-learn - 机器学习（详见机器学习模块）
from sklearn.ensemble import RandomForestRegressor
model = RandomForestRegressor()
model.fit(X_train, y_train)

# 4. Openpyxl - Excel高级操作
from openpyxl import load_workbook
wb = load_workbook('data.xlsx')
ws = wb.active
ws['A1'] = 'Hello'

# 5. Requests - API数据获取
import requests
response = requests.get('https://api.example.com/data')
data = response.json()

# 6. Beautiful Soup - 网页数据抓取
from bs4 import BeautifulSoup
soup = BeautifulSoup(html, 'html.parser')
titles = soup.find_all('h2')`
        }
      ]
    },
    {
      id: 'jupyter',
      title: 'PART 14 Jupyter Notebook 完全指南',
      subtitle: '数据分析师的主战场 —— 90%的探索性工作在这里完成',
      items: [
        {
          emoji: '⌨️',
          title: 'Jupyter快捷键大全 ☆',
          desc: '掌握快捷键，效率提升10倍',
          detail: '**典型业务场景**：快速编写和运行代码、调试、演示\\n**易踩坑点**：不知道快捷键，鼠标操作效率低\\n**可继续深挖**：自定义快捷键、Vim模式',
          code: `# ========== 命令模式（按 Esc 进入）==========
# A - 在上方插入新单元格
# B - 在下方插入新单元格
# D,D - 删除当前单元格（连按两次D）
# M - 转换为Markdown单元格
# Y - 转换为代码单元格
# Shift+M - 合并选中的单元格
# Ctrl+Shift+- - 分割单元格

# ========== 编辑模式（按 Enter 进入）==========
# Ctrl+Enter - 运行当前单元格
# Shift+Enter - 运行当前单元格并选择下一个
# Alt+Enter - 运行当前单元格并在下方插入新单元格
# Ctrl+/ - 注释/取消注释
# Tab - 代码补全
# Shift+Tab - 查看函数文档

# ========== 通用快捷键 ==========
# Ctrl+S - 保存
# Ctrl+Shift+P - 打开命令面板
# H - 显示快捷键帮助
# Shift+L - 显示/隐藏行号`
        },
        {
          emoji: '✨',
          title: 'Magic命令 ☆',
          desc: 'Jupyter的超能力 —— %和%%魔法命令',
          detail: '**典型业务场景**：代码性能分析、调试、系统命令执行\\n**易踩坑点**：不知道有这些强大功能存在\\n**可继续深挖**：自定义magic命令',
          code: `# 1. 性能分析
%timeit sum(range(100))  # 测试单行代码执行时间
%%timeit  # 测试整个单元格执行时间
total = 0
for i in range(100):
    total += i

# 2. 显示matplotlib图表
%matplotlib inline  # 图表嵌入notebook
%matplotlib notebook  # 交互式图表

# 3. 自动重载模块
%load_ext autoreload
%autoreload 2  # 自动重载所有模块

# 4. 查看变量
%whos  # 显示所有变量
%who_ls  # 返回变量列表

# 5. 运行外部Python文件
%run script.py

# 6. 调试
%debug  # 进入调试模式
%pdb on  # 自动进入调试器

# 7. 系统命令
!pip install pandas  # 执行系统命令
!ls  # Linux/Mac
!dir  # Windows

# 8. 环境变量
%env  # 查看环境变量
%env MY_VAR=value  # 设置环境变量

# 9. 代码性能分析
%prun my_function()  # 性能分析
%lprun -f my_function my_function()  # 逐行性能分析

# 10. 保存单元格内容
%%writefile script.py
def hello():
    print("Hello World")`
        },
        {
          emoji: '🔧',
          title: 'Jupyter高级技巧',
          desc: '让Jupyter更强大的实用技巧',
          detail: '**典型业务场景**：展示数据、调试代码、生成报告\\n**易踩坑点**：不知道这些功能，手工操作浪费时间\\n**可继续深挖**：Jupyter扩展开发',
          code: `# 1. 显示多个输出
from IPython.core.interactiveshell import InteractiveShell
InteractiveShell.ast_node_interactivity = "all"
df.head()
df.describe()
df.info()  # 三个都会显示

# 2. 隐藏警告
import warnings
warnings.filterwarnings('ignore')

# 3. 设置显示选项
import pandas as pd
pd.set_option('display.max_rows', 100)
pd.set_option('display.max_columns', 50)
pd.set_option('display.width', 1000)
pd.set_option('display.float_format', '{:.2f}'.format)

# 4. 进度条
from tqdm import tqdm
for i in tqdm(range(100)):
    # 处理数据
    pass

# 5. 交互式小部件
from ipywidgets import interact
@interact(x=(0, 10))
def plot_data(x):
    return x ** 2

# 6. 显示DataFrame样式
df.style.background_gradient(cmap='coolwarm')\\
    .highlight_max(axis=0)\\
    .format("{:.2f}")

# 7. 导出为HTML/PDF
# 命令行执行
# jupyter nbconvert --to html notebook.ipynb
# jupyter nbconvert --to pdf notebook.ipynb

# 8. 变量查看器（需安装扩展）
%load_ext jupyter_contrib_nbextensions
# 启用Variable Inspector扩展`
        },
        {
          emoji: '🚀',
          title: 'JupyterLab扩展推荐',
          desc: '必装扩展，大幅提升效率',
          detail: '**典型业务场景**：代码格式化、Git集成、表格查看\\n**易踩坑点**：不知道有这些扩展，原生功能受限\\n**可继续深挖**：自定义扩展开发',
          code: `# 安装JupyterLab（推荐使用Lab而不是Notebook）
pip install jupyterlab

# 1. 代码格式化 - Black
pip install jupyterlab-code-formatter black
# 使用：Ctrl+Shift+I 格式化代码

# 2. 变量查看器
pip install lckr-jupyterlab-variableinspector

# 3. Git集成
pip install jupyterlab-git

# 4. 表格查看器（更好的DataFrame显示）
pip install jupyterlab-spreadsheet-editor

# 5. Plotly支持
pip install jupyterlab-plotly

# 6. 目录生成器
pip install jupyterlab-toc

# 7. 代码补全增强
pip install jupyter-lsp
pip install python-lsp-server

# 8. Debugger可视化调试
# JupyterLab 3.0+ 内置，点击bug图标启用

# 启动JupyterLab
jupyter lab

# 常用配置
# 生成配置文件
jupyter lab --generate-config

# 设置默认浏览器、端口等
# 编辑 ~/.jupyter/jupyter_lab_config.py`
        }
      ]
    },
    {
      id: 'data-io',
      title: 'PART 15 数据导入导出大全',
      subtitle: '数据分析的第一步 —— 各种数据源的读取与写入',
      items: [
        {
          emoji: '📊',
          title: 'Excel文件操作 ☆',
          desc: '读取多sheet、样式保留、大文件处理',
          detail: '**典型业务场景**：业务部门常用Excel交付数据\\n**易踩坑点**：编码问题、日期格式、合并单元格\\n**可继续深挖**：openpyxl高级操作、xlwings与Excel交互',
          code: `import pandas as pd

# 1. 基础读取
df = pd.read_excel('data.xlsx')

# 2. 读取指定sheet
df = pd.read_excel('data.xlsx', sheet_name='Sheet1')

# 3. 读取多个sheet
dfs = pd.read_excel('data.xlsx', sheet_name=['Sheet1', 'Sheet2'])
dfs = pd.read_excel('data.xlsx', sheet_name=None)  # 读取所有sheet

# 4. 指定读取行列
df = pd.read_excel('data.xlsx', 
                   usecols='A:E',  # 只读A-E列
                   skiprows=2,  # 跳过前2行
                   nrows=1000)  # 只读1000行

# 5. 处理日期
df = pd.read_excel('data.xlsx', parse_dates=['日期列'])

# 6. 写入Excel（单sheet）
df.to_excel('output.xlsx', index=False, sheet_name='结果')

# 7. 写入多个sheet
with pd.ExcelWriter('output.xlsx', engine='openpyxl') as writer:
    df1.to_excel(writer, sheet_name='销售数据', index=False)
    df2.to_excel(writer, sheet_name='用户数据', index=False)
    df3.to_excel(writer, sheet_name='汇总分析', index=False)

# 8. 保留Excel样式（追加数据）
from openpyxl import load_workbook
with pd.ExcelWriter('existing.xlsx', engine='openpyxl', mode='a') as writer:
    df.to_excel(writer, sheet_name='新Sheet', index=False)

# 9. 处理大文件（分块读取）
chunks = pd.read_excel('big_file.xlsx', chunksize=10000)
for chunk in chunks:
    process(chunk)`
        },
        {
          emoji: '📄',
          title: 'CSV文件操作 ☆',
          desc: '编码处理、分隔符、大文件分块',
          detail: '**典型业务场景**：最常见的数据交换格式\\n**易踩坑点**：编码问题（UTF-8 vs GBK）、分隔符错误\\n**可继续深挖**：CSV压缩、流式处理',
          code: `# 1. 基础读取
df = pd.read_csv('data.csv')

# 2. 编码处理（重要！）
df = pd.read_csv('data.csv', encoding='utf-8')
df = pd.read_csv('data.csv', encoding='gbk')  # 中文Windows常用
df = pd.read_csv('data.csv', encoding='latin-1')  # 备选方案

# 3. 指定分隔符
df = pd.read_csv('data.txt', sep='\\t')  # Tab分隔
df = pd.read_csv('data.txt', sep='|')  # 竖线分隔

# 4. 处理缺失值
df = pd.read_csv('data.csv', na_values=['NA', 'null', ''])

# 5. 指定数据类型（提升性能）
dtypes = {'user_id': str, 'age': int, 'amount': float}
df = pd.read_csv('data.csv', dtype=dtypes)

# 6. 日期解析
df = pd.read_csv('data.csv', parse_dates=['date_column'])

# 7. 大文件分块读取（推荐！）
chunks = []
for chunk in pd.read_csv('big_file.csv', chunksize=100000):
    # 处理每个chunk
    processed = process(chunk)
    chunks.append(processed)
df = pd.concat(chunks, ignore_index=True)

# 8. 写入CSV
df.to_csv('output.csv', index=False, encoding='utf-8-sig')  # Excel友好

# 9. 压缩写入
df.to_csv('output.csv.gz', index=False, compression='gzip')

# 10. 只读取部分列
df = pd.read_csv('data.csv', usecols=['user_id', 'amount', 'date'])`
        },
        {
          emoji: '🗄️',
          title: '数据库读写 ☆',
          desc: 'MySQL、PostgreSQL、SQLite等数据库操作',
          detail: '**典型业务场景**：从生产数据库读取数据、回写分析结果\\n**易踩坑点**：连接池、大数据量OOM、SQL注入\\n**可继续深挖**：连接池管理、ORM框架',
          code: `import pandas as pd
from sqlalchemy import create_engine
import pymysql

# 1. SQLite（无需安装）
import sqlite3
conn = sqlite3.connect('database.db')
df = pd.read_sql('SELECT * FROM orders', conn)
conn.close()

# 2. MySQL/MariaDB
engine = create_engine('mysql+pymysql://user:pass@host:3306/dbname')
df = pd.read_sql('SELECT * FROM orders WHERE date > "2024-01-01"', engine)

# 3. PostgreSQL
engine = create_engine('postgresql://user:pass@host:5432/dbname')
df = pd.read_sql_query('SELECT * FROM sales', engine)

# 4. 参数化查询（防SQL注入）
query = "SELECT * FROM users WHERE user_id = %(id)s"
df = pd.read_sql(query, engine, params={'id': 1001})

# 5. 批量读取（分块）
query = "SELECT * FROM large_table"
for chunk in pd.read_sql(query, engine, chunksize=10000):
    process(chunk)

# 6. 写入数据库
df.to_sql('table_name', engine, if_exists='replace', index=False)
# if_exists: 'fail', 'replace', 'append'

# 7. 批量插入（高效）
df.to_sql('table_name', engine, if_exists='append', index=False,
          method='multi', chunksize=1000)

# 8. 使用with语句（自动关闭连接）
with engine.connect() as conn:
    df = pd.read_sql('SELECT * FROM orders', conn)

# 9. 读取表结构
query = "SHOW CREATE TABLE table_name"
structure = pd.read_sql(query, engine)

# 10. 执行多条SQL
with engine.begin() as conn:
    conn.execute("DELETE FROM temp_table")
    df.to_sql('temp_table', conn, if_exists='append', index=False)`
        },
        {
          emoji: '🌐',
          title: 'JSON/API数据',
          desc: 'JSON文件、RESTful API数据获取',
          detail: '**典型业务场景**：调用第三方API、处理嵌套JSON\\n**易踩坑点**：嵌套结构展开、API限流\\n**可继续深挖**：异步请求、GraphQL',
          code: `import pandas as pd
import json
import requests

# 1. 读取JSON文件
df = pd.read_json('data.json')

# 2. 处理嵌套JSON
with open('nested.json', 'r', encoding='utf-8') as f:
    data = json.load(f)
df = pd.json_normalize(data, record_path=['items'])

# 3. 从API获取数据
response = requests.get('https://api.example.com/data')
data = response.json()
df = pd.DataFrame(data)

# 4. 带参数的API请求
params = {'start_date': '2024-01-01', 'end_date': '2024-12-31'}
response = requests.get('https://api.example.com/sales', params=params)
df = pd.DataFrame(response.json())

# 5. POST请求
payload = {'user_id': 123, 'action': 'query'}
response = requests.post('https://api.example.com/data', json=payload)
df = pd.DataFrame(response.json())

# 6. 带认证的请求
headers = {'Authorization': 'Bearer YOUR_TOKEN'}
response = requests.get('https://api.example.com/data', headers=headers)
df = pd.DataFrame(response.json())

# 7. 处理分页API
all_data = []
page = 1
while True:
    response = requests.get(f'https://api.example.com/data?page={page}')
    data = response.json()
    if not data:
        break
    all_data.extend(data)
    page += 1
df = pd.DataFrame(all_data)

# 8. 写入JSON
df.to_json('output.json', orient='records', force_ascii=False, indent=2)

# 9. 展开嵌套列
df = pd.json_normalize(data, 
                       record_path=['orders'], 
                       meta=['user_id', 'user_name'])

# 10. 错误处理
try:
    response = requests.get('https://api.example.com/data', timeout=10)
    response.raise_for_status()
    df = pd.DataFrame(response.json())
except requests.exceptions.RequestException as e:
    print(f"请求失败: {e}")`
        },
        {
          emoji: '⚡',
          title: '高效格式推荐',
          desc: 'Parquet、Feather —— 比CSV快10倍',
          detail: '**典型业务场景**：存储大数据集、数据中间结果缓存\\n**易踩坑点**：不知道这些格式存在，一直用CSV\\n**可继续深挖**：Apache Arrow、数据湖',
          code: `# 1. Parquet（推荐！）
# 安装: pip install pyarrow
df.to_parquet('data.parquet', index=False)
df = pd.read_parquet('data.parquet')

# 优点：
# - 压缩率高（比CSV小5-10倍）
# - 读取速度快（比CSV快10-50倍）
# - 保留数据类型
# - 支持列式存储

# 2. Feather（超快！）
# 安装: pip install pyarrow
df.to_feather('data.feather')
df = pd.read_feather('data.feather')

# 优点：
# - 读写速度极快
# - 完美保留Pandas数据类型
# - 适合临时缓存

# 3. HDF5（科学计算常用）
# 安装: pip install tables
df.to_hdf('data.h5', key='df', mode='w')
df = pd.read_hdf('data.h5', 'df')

# 4. Pickle（Python专用）
df.to_pickle('data.pkl')
df = pd.read_pickle('data.pkl')

# 性能对比（10GB数据）
# CSV:      写入60s  读取120s  文件大小10GB
# Parquet:  写入20s  读取10s   文件大小2GB
# Feather:  写入8s   读取5s    文件大小4GB

# 5. 实际应用建议
# - 数据交换：用CSV（通用性好）
# - 数据存储：用Parquet（压缩率高）
# - 临时缓存：用Feather（速度最快）
# - Python内部：用Pickle（完整保存对象）`
        }
      ]
    },
    {
      id: 'pandas-advanced',
      title: 'PART 16 Pandas 高级技巧',
      subtitle: '进阶操作 —— 提升数据处理效率10倍',
      items: [
        {
          emoji: '🚀',
          title: 'apply vs map vs applymap 性能对比 ☆',
          desc: '选择正确的方法，性能提升10-100倍',
          detail: '**核心**：向量化操作 > apply > 循环\\n**易踩坑点**：误用apply导致性能低下\\n**可继续深挖**：Cython、Numba加速',
          code: `import pandas as pd
import numpy as np
import time

# 创建测试数据
df = pd.DataFrame({
    'A': np.random.randint(0, 100, 1000000),
    'B': np.random.randint(0, 100, 1000000)
})

# ========== 方法1：循环（最慢，不推荐）==========
start = time.time()
result = []
for val in df['A']:
    result.append(val * 2)
df['C'] = result
print(f"循环耗时: {time.time() - start:.3f}s")

# ========== 方法2：apply（中等速度）==========
start = time.time()
df['C'] = df['A'].apply(lambda x: x * 2)
print(f"apply耗时: {time.time() - start:.3f}s")

# ========== 方法3：向量化（最快，推荐！）==========
start = time.time()
df['C'] = df['A'] * 2
print(f"向量化耗时: {time.time() - start:.3f}s")

# ========== map vs apply ==========
# map: 用于Series，映射字典或函数
df['category'] = df['A'].map({0: 'low', 50: 'medium', 100: 'high'})
df['category'] = df['A'].map(lambda x: 'high' if x > 50 else 'low')

# apply: 用于Series或DataFrame
df['C'] = df['A'].apply(lambda x: x * 2)  # Series
df['sum'] = df.apply(lambda row: row['A'] + row['B'], axis=1)  # DataFrame

# ========== applymap (已废弃，用map替代) ==========
# 对DataFrame的所有元素应用函数
df_numeric = df[['A', 'B']].map(lambda x: x * 2)  # Pandas 2.1+

# ========== 性能优化建议 ==========
# 1. 优先使用向量化操作
# 2. 需要条件判断时用 np.where、np.select
# 3. 复杂逻辑才用 apply
# 4. 避免循环

# 示例：条件赋值（推荐方法）
df['level'] = np.where(df['A'] > 80, 'high',
                np.where(df['A'] > 50, 'medium', 'low'))

# 多条件使用 np.select
conditions = [df['A'] > 80, df['A'] > 50, df['A'] > 20]
choices = ['high', 'medium', 'low']
df['level'] = np.select(conditions, choices, default='very_low')`
        },
        {
          emoji: '🔄',
          title: 'pivot_table 透视表高级用法 ☆',
          desc: 'Excel透视表的Python实现，数据分析利器',
          detail: '**业务场景**：多维度数据汇总、交叉分析\\n**易踩坑点**：aggfunc参数、fill_value\\n**可继续深挖**：crosstab、groupby高级用法',
          code: `import pandas as pd
import numpy as np

# 创建销售数据
df = pd.DataFrame({
    'date': pd.date_range('2024-01-01', periods=100),
    'region': np.random.choice(['北区', '南区', '东区', '西区'], 100),
    'product': np.random.choice(['产品A', '产品B', '产品C'], 100),
    'sales': np.random.randint(100, 1000, 100),
    'quantity': np.random.randint(1, 20, 100)
})

# ========== 基础透视表 ==========
# 按地区和产品汇总销售额
pivot1 = pd.pivot_table(
    df,
    values='sales',
    index='region',
    columns='product',
    aggfunc='sum',
    fill_value=0
)
print("基础透视表:")
print(pivot1)

# ========== 多列聚合 ==========
pivot2 = pd.pivot_table(
    df,
    values=['sales', 'quantity'],
    index='region',
    columns='product',
    aggfunc={'sales': 'sum', 'quantity': 'mean'},
    fill_value=0
)
print("\\n多列聚合:")
print(pivot2)

# ========== 多重索引 ==========
df['month'] = df['date'].dt.month
pivot3 = pd.pivot_table(
    df,
    values='sales',
    index=['region', 'month'],
    columns='product',
    aggfunc='sum',
    fill_value=0,
    margins=True,  # 添加总计行
    margins_name='总计'
)
print("\\n多重索引+总计:")
print(pivot3)

# ========== 多种聚合函数 ==========
pivot4 = pd.pivot_table(
    df,
    values='sales',
    index='region',
    columns='product',
    aggfunc=['sum', 'mean', 'count'],
    fill_value=0
)
print("\\n多种聚合函数:")
print(pivot4)

# ========== 自定义聚合函数 ==========
def custom_agg(x):
    return x.max() - x.min()

pivot5 = pd.pivot_table(
    df,
    values='sales',
    index='region',
    aggfunc={'sales': [('最大值', 'max'), ('最小值', 'min'), ('极差', custom_agg)]}
)
print("\\n自定义聚合函数:")
print(pivot5)

# ========== 透视表转回长格式 ==========
pivot_reset = pivot1.reset_index()
long_format = pivot1.melt(ignore_index=False, var_name='product', value_name='sales')
print("\\n转回长格式:")
print(long_format.head())`
        },
        {
          emoji: '🔀',
          title: 'melt 数据重塑（宽转长）',
          desc: '将宽表转换为长表，方便分析和可视化',
          detail: '**业务场景**：多列转单列、时间序列分析\\n**反向操作**：pivot（长转宽）\\n**可继续深挖**：stack/unstack',
          code: `import pandas as pd

# ========== 宽表示例 ==========
wide_df = pd.DataFrame({
    'name': ['张三', '李四', '王五'],
    '语文': [85, 90, 88],
    '数学': [92, 88, 95],
    '英语': [78, 85, 90]
})
print("宽表:")
print(wide_df)

# ========== 基础 melt ==========
long_df = pd.melt(
    wide_df,
    id_vars=['name'],  # 保持不变的列
    value_vars=['语文', '数学', '英语'],  # 要转换的列
    var_name='科目',  # 新列名（原列名）
    value_name='成绩'  # 新列名（值）
)
print("\\n长表:")
print(long_df)

# ========== 不指定 value_vars（转换所有其他列）==========
long_df2 = pd.melt(wide_df, id_vars=['name'], var_name='科目', value_name='成绩')

# ========== 多个 id_vars ==========
wide_df2 = pd.DataFrame({
    'name': ['张三', '李四'],
    'class': ['1班', '2班'],
    'Q1_sales': [100, 150],
    'Q2_sales': [120, 160],
    'Q3_sales': [110, 155],
    'Q4_sales': [130, 170]
})

long_df3 = pd.melt(
    wide_df2,
    id_vars=['name', 'class'],
    value_vars=['Q1_sales', 'Q2_sales', 'Q3_sales', 'Q4_sales'],
    var_name='quarter',
    value_name='sales'
)
print("\\n多个id_vars:")
print(long_df3)

# ========== 反向操作：pivot（长转宽）==========
wide_again = long_df.pivot(
    index='name',
    columns='科目',
    values='成绩'
).reset_index()
print("\\n长表转回宽表:")
print(wide_again)

# ========== stack/unstack（多层索引转换）==========
# stack: 列转行（宽转长）
stacked = wide_df.set_index('name').stack()
print("\\nstack结果:")
print(stacked)

# unstack: 行转列（长转宽）
unstacked = stacked.unstack()
print("\\nunstack结果:")
print(unstacked)`
        },
        {
          emoji: '📊',
          title: 'crosstab 交叉表分析',
          desc: '统计两个或多个变量的频次分布',
          detail: '**业务场景**：用户画像、AB测试分析\\n**与pivot_table区别**：crosstab用于频次统计\\n**可继续深挖**：卡方检验',
          code: `import pandas as pd
import numpy as np

# 创建用户数据
df = pd.DataFrame({
    'user_id': range(1, 1001),
    'gender': np.random.choice(['男', '女'], 1000),
    'age_group': np.random.choice(['18-25', '26-35', '36-45', '46+'], 1000),
    'product': np.random.choice(['产品A', '产品B', '产品C'], 1000),
    'purchased': np.random.choice([0, 1], 1000, p=[0.7, 0.3])
})

# ========== 基础交叉表（频次统计）==========
cross1 = pd.crosstab(df['gender'], df['age_group'])
print("性别×年龄组 交叉表:")
print(cross1)

# ========== 添加总计 ==========
cross2 = pd.crosstab(
    df['gender'], 
    df['age_group'],
    margins=True,
    margins_name='总计'
)
print("\\n添加总计:")
print(cross2)

# ========== 计算比例（normalize）==========
# normalize='all': 占总体的比例
cross3 = pd.crosstab(df['gender'], df['age_group'], normalize='all')
print("\\n占总体比例:")
print(cross3)

# normalize='index': 行比例
cross4 = pd.crosstab(df['gender'], df['age_group'], normalize='index')
print("\\n行比例:")
print(cross4)

# normalize='columns': 列比例
cross5 = pd.crosstab(df['gender'], df['age_group'], normalize='columns')
print("\\n列比例:")
print(cross5)

# ========== 多维交叉表 ==========
cross6 = pd.crosstab(
    [df['gender'], df['age_group']],  # 多行索引
    df['product']
)
print("\\n多维交叉表:")
print(cross6)

# ========== 带聚合的交叉表 ==========
# 统计不同性别和年龄组的购买率
cross7 = pd.crosstab(
    df['gender'],
    df['age_group'],
    values=df['purchased'],
    aggfunc='mean'
)
print("\\n购买率交叉表:")
print(cross7)

# ========== 业务应用：AB测试分析 ==========
ab_test = pd.DataFrame({
    'user_id': range(1, 10001),
    'group': np.random.choice(['A', 'B'], 10000),
    'converted': np.random.choice([0, 1], 10000, p=[0.85, 0.15])
})

# 计算转化率
conversion = pd.crosstab(
    ab_test['group'],
    ab_test['converted'],
    normalize='index'
) * 100
print("\\nAB测试转化率(%):")
print(conversion)`
        },
        {
          emoji: '🔗',
          title: 'pipe 链式操作',
          desc: '让代码更优雅、可读性更强',
          detail: '**优点**：避免中间变量、代码更清晰\\n**适用**：多步数据处理流程\\n**可继续深挖**：自定义pipe函数',
          code: `import pandas as pd
import numpy as np

# 创建数据
df = pd.DataFrame({
    'name': ['张三', '李四', '王五', '赵六', '钱七'],
    'age': [25, 30, 35, 28, 32],
    'salary': [8000, 12000, 15000, 9000, 11000],
    'department': ['销售', '技术', '技术', '销售', '市场']
})

# ========== 传统方法（产生中间变量）==========
df_filtered = df[df['age'] > 25]
df_sorted = df_filtered.sort_values('salary', ascending=False)
df_final = df_sorted.reset_index(drop=True)
print("传统方法结果:")
print(df_final)

# ========== pipe方法（链式操作）==========
result = (df
    .pipe(lambda x: x[x['age'] > 25])
    .pipe(lambda x: x.sort_values('salary', ascending=False))
    .pipe(lambda x: x.reset_index(drop=True))
)
print("\\npipe方法结果:")
print(result)

# ========== 自定义pipe函数 ==========
def filter_age(df, min_age):
    return df[df['age'] > min_age]

def add_bonus(df, bonus_rate=0.1):
    df = df.copy()
    df['bonus'] = df['salary'] * bonus_rate
    return df

def format_currency(df, cols):
    df = df.copy()
    for col in cols:
        df[col] = df[col].apply(lambda x: f'¥{x:,.0f}')
    return df

# 使用自定义函数
result2 = (df
    .pipe(filter_age, min_age=25)
    .pipe(add_bonus, bonus_rate=0.15)
    .pipe(format_currency, cols=['salary', 'bonus'])
)
print("\\n自定义pipe函数:")
print(result2)

# ========== 复杂数据处理流程 ==========
sales_df = pd.DataFrame({
    'date': pd.date_range('2024-01-01', periods=100),
    'product': np.random.choice(['A', 'B', 'C'], 100),
    'sales': np.random.randint(100, 1000, 100),
    'quantity': np.random.randint(1, 20, 100)
})

def add_time_features(df):
    df = df.copy()
    df['year'] = df['date'].dt.year
    df['month'] = df['date'].dt.month
    df['weekday'] = df['date'].dt.dayofweek
    return df

def calculate_metrics(df):
    df = df.copy()
    df['unit_price'] = df['sales'] / df['quantity']
    return df

def aggregate_by_product(df):
    return df.groupby('product').agg({
        'sales': 'sum',
        'quantity': 'sum',
        'unit_price': 'mean'
    }).round(2)

# 完整处理流程
analysis = (sales_df
    .pipe(add_time_features)
    .pipe(calculate_metrics)
    .pipe(aggregate_by_product)
)
print("\\n完整分析流程:")
print(analysis)`
        },
        {
          emoji: '⚡',
          title: 'eval 和 query 性能优化',
          desc: '大数据集下的高效查询和计算',
          detail: '**性能提升**：比传统方法快2-10倍\\n**适用**：大数据集（>10万行）\\n**易踩坑点**：语法限制、列名限制',
          code: `import pandas as pd
import numpy as np
import time

# 创建大数据集
np.random.seed(42)
df = pd.DataFrame({
    'A': np.random.randn(1000000),
    'B': np.random.randn(1000000),
    'C': np.random.randn(1000000),
    'category': np.random.choice(['X', 'Y', 'Z'], 1000000)
})

# ========== eval：表达式计算 ==========
# 传统方法
start = time.time()
df['D1'] = df['A'] + df['B'] * df['C']
t1 = time.time() - start

# eval方法（更快）
start = time.time()
df['D2'] = df.eval('A + B * C')
t2 = time.time() - start

print(f"传统方法耗时: {t1:.3f}s")
print(f"eval方法耗时: {t2:.3f}s")
print(f"性能提升: {t1/t2:.2f}倍")

# ========== query：条件过滤 ==========
# 传统方法
start = time.time()
result1 = df[(df['A'] > 0) & (df['B'] < 0) & (df['category'] == 'X')]
t1 = time.time() - start

# query方法（更快）
start = time.time()
result2 = df.query('A > 0 and B < 0 and category == "X"')
t2 = time.time() - start

print(f"\\n传统过滤耗时: {t1:.3f}s")
print(f"query过滤耗时: {t2:.3f}s")
print(f"性能提升: {t1/t2:.2f}倍")

# ========== eval 高级用法 ==========
# 多个赋值
df.eval('''
    D = A + B
    E = A * B
    F = A / (B + 1)
''', inplace=True)

# 使用变量
threshold = 0.5
df.query('A > @threshold and B < @threshold')

# ========== query 高级用法 ==========
# 复杂条件
result = df.query('(A > 0 and B > 0) or (A < 0 and B < 0)')

# 使用变量
min_val = -1
max_val = 1
result = df.query('@min_val < A < @max_val')

# 字符串匹配
result = df.query('category in ["X", "Y"]')

# ========== 注意事项 ==========
# 1. 列名不能有空格（或用反引号）
df_space = pd.DataFrame({'col_1': [1, 2], 'col_2': [3, 4]})
# 如果列名有空格，需要用反引号
# 错误：df_space.query('col 1 > 1')
# 正确：result = df_space.query('\`col 1\` > 1')

# 2. 不支持所有Pandas操作
# query只支持比较、逻辑运算，不支持复杂函数

# 3. 小数据集可能更慢（有额外解析开销）
small_df = df.head(100)
# 小数据集用传统方法更好`
        },
        {
          emoji: '🎨',
          title: 'style 样式化输出',
          desc: 'DataFrame美化，让报告更专业',
          detail: '**业务场景**：数据报告、演示文稿\\n**输出**：带样式的HTML、Excel\\n**可继续深挖**：自定义样式函数',
          code: `import pandas as pd
import numpy as np

# 创建销售数据
df = pd.DataFrame({
    'region': ['北区', '南区', '东区', '西区', '中区'],
    'Q1': [120, 150, 180, 90, 160],
    'Q2': [130, 140, 190, 95, 155],
    'Q3': [125, 160, 185, 100, 165],
    'Q4': [140, 155, 195, 105, 170]
})

# ========== 基础样式 ==========
# 高亮最大值
styled1 = df.style.highlight_max(axis=0, color='#19bcc8')

# 高亮最小值
styled2 = df.style.highlight_min(axis=1, color='#ff6b6b')

# ========== 渐变色 ==========
# 按列应用渐变色
styled3 = df.style.background_gradient(
    subset=['Q1', 'Q2', 'Q3', 'Q4'],
    cmap='Blues'
)

# ========== 数据条（类似Excel）==========
styled4 = df.style.bar(
    subset=['Q1', 'Q2', 'Q3', 'Q4'],
    color='#19bcc8'
)

# ========== 格式化数字 ==========
styled5 = df.style.format({
    'Q1': '¥{:,.0f}',
    'Q2': '¥{:,.0f}',
    'Q3': '¥{:,.0f}',
    'Q4': '¥{:,.0f}'
})

# ========== 条件格式化 ==========
def highlight_low(val):
    color = '#ff6b6b' if val < 120 else ''
    return f'background-color: {color}'

styled6 = df.style.map(highlight_low, subset=['Q1', 'Q2', 'Q3', 'Q4'])

# ========== 自定义样式函数 ==========
def color_by_value(val):
    if val < 100:
        return 'background-color: #ff6b6b; color: white'
    elif val < 150:
        return 'background-color: #ffd93d'
    else:
        return 'background-color: #19bcc8; color: white'

styled7 = df.style.map(color_by_value, subset=['Q1', 'Q2', 'Q3', 'Q4'])

# ========== 组合多种样式 ==========
styled_final = (df.style
    .background_gradient(subset=['Q1', 'Q2', 'Q3', 'Q4'], cmap='coolwarm')
    .highlight_max(axis=0, color='yellow')
    .format({
        'Q1': '¥{:,.0f}',
        'Q2': '¥{:,.0f}',
        'Q3': '¥{:,.0f}',
        'Q4': '¥{:,.0f}'
    })
    .set_caption('2024年季度销售报告')
)

# ========== 导出 ==========
# 导出为HTML
styled_final.to_html('report.html')

# 导出为Excel（保留样式）
with pd.ExcelWriter('report.xlsx', engine='openpyxl') as writer:
    df.to_excel(writer, sheet_name='原始数据', index=False)
    # 注意：Excel导出不完全支持所有样式

print("\\n✅ 样式化报告已生成")`
        }
      ]
    },
    {
      id: 'string-processing',
      title: 'PART 17 字符串处理专题',
      subtitle: '文本数据清洗与提取 —— str访问器全解析',
      items: [
        {
          emoji: '🔤',
          title: 'str访问器基础操作 ☆',
          desc: '字符串大小写、去空格、替换',
          detail: '**核心**：Series.str 可以调用所有字符串方法\\n**易踩坑点**：NaN值处理\\n**可继续深挖**：正则表达式',
          code: `import pandas as pd
import numpy as np

# 创建数据
df = pd.DataFrame({
    'name': ['  张三  ', 'LI SI', '王五', None, 'zhao liu'],
    'email': ['zhang@qq.com', 'lisi@GMAIL.COM', 'ww@163.com', np.nan, 'zl@sina.com'],
    'phone': ['138-1234-5678', '139 8765 4321', '13512345678', '(010)12345678', '+86-136-9999-8888']
})

# ========== 大小写转换 ==========
df['name_upper'] = df['name'].str.upper()  # 转大写
df['name_lower'] = df['name'].str.lower()  # 转小写
df['name_title'] = df['name'].str.title()  # 首字母大写
df['email_lower'] = df['email'].str.lower()  # 邮箱统一小写

print("大小写转换:")
print(df[['name', 'name_upper', 'name_lower', 'name_title']])

# ========== 去除空格 ==========
df['name_strip'] = df['name'].str.strip()  # 去除两端空格
df['name_lstrip'] = df['name'].str.lstrip()  # 去除左侧空格
df['name_rstrip'] = df['name'].str.rstrip()  # 去除右侧空格

print("\\n去除空格:")
print(df[['name', 'name_strip']])

# ========== 替换 ==========
df['phone_clean'] = df['phone'].str.replace('-', '').str.replace(' ', '').str.replace('(', '').str.replace(')', '').str.replace('+86', '')

print("\\n电话号码清洗:")
print(df[['phone', 'phone_clean']])

# ========== 字符串拼接 ==========
df['full_info'] = df['name'].str.strip() + ' - ' + df['email']

# ========== 判断包含 ==========
df['is_qq'] = df['email'].str.contains('qq', case=False, na=False)
df['is_mobile'] = df['phone'].str.contains('^1[3-9]\\d', regex=True, na=False)

print("\\n判断包含:")
print(df[['email', 'is_qq', 'phone', 'is_mobile']])

# ========== 判断开头/结尾 ==========
df['starts_with_1'] = df['phone_clean'].str.startswith('1', na=False)
df['ends_with_com'] = df['email'].str.endswith('.com', na=False)

# ========== 字符串长度 ==========
df['name_len'] = df['name'].str.strip().str.len()
df['phone_len'] = df['phone_clean'].str.len()

print("\\n字符串长度:")
print(df[['name', 'name_len']])

# ========== 字符串切片 ==========
df['email_domain'] = df['email'].str.split('@').str[1]  # 提取域名
df['phone_prefix'] = df['phone_clean'].str[:3]  # 前3位

print("\\n字符串切片:")
print(df[['email', 'email_domain']])`
        },
        {
          emoji: '🔍',
          title: '正则表达式实战 ☆',
          desc: 'Python正则表达式在数据清洗中的应用',
          detail: '**核心**：str.extract、str.findall、str.replace\\n**易踩坑点**：转义字符、贪婪匹配\\n**可继续深挖**：命名捕获组',
          code: `import pandas as pd
import re

# 创建测试数据
df = pd.DataFrame({
    'text': [
        '联系电话：138-1234-5678',
        '我的邮箱是zhang@qq.com，备用邮箱li@163.com',
        '订单号：ORDER20240101-12345',
        '金额：¥1,234.56元',
        '身份证：110101199001011234'
    ]
})

# ========== 提取电话号码 ==========
df['phone'] = df['text'].str.extract(r'(1[3-9]\\d{1}-?\\d{4}-?\\d{4})')

# ========== 提取邮箱 ==========
df['email'] = df['text'].str.extract(r'([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})')

# 提取所有邮箱（可能有多个）
df['all_emails'] = df['text'].str.findall(r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')

# ========== 提取数字 ==========
df['order_num'] = df['text'].str.extract(r'ORDER(\\d+-\\d+)')
df['amount'] = df['text'].str.extract(r'¥([\\d,]+\\.\\d+)')

print("正则提取结果:")
print(df[['text', 'phone', 'email', 'amount']])

# ========== 替换（正则）==========
# 替换所有数字为*
df['masked'] = df['text'].str.replace(r'\\d', '*', regex=True)

# 移除所有标点符号
df['no_punct'] = df['text'].str.replace(r'[^\\w\\s]', '', regex=True)

print("\\n正则替换:")
print(df[['text', 'masked']])

# ========== 验证格式 ==========
# 验证邮箱格式
email_pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
emails = pd.Series(['zhang@qq.com', 'invalid-email', 'li@163.com', '@wrong.com'])
emails_valid = emails.str.match(email_pattern)

print("\\n邮箱验证:")
print(pd.DataFrame({'email': emails, 'valid': emails_valid}))

# ========== 命名捕获组 ==========
order_df = pd.DataFrame({
    'order': ['ORDER20240101-12345', 'ORDER20240102-67890']
})

# 使用命名捕获组
extracted = order_df['order'].str.extract(r'ORDER(?P<date>\\d+)-(?P<id>\\d+)')
print("\\n命名捕获组:")
print(extracted)

# ========== 常用正则模式 ==========
patterns = {
    '手机号': r'1[3-9]\\d{9}',
    '邮箱': r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}',
    '身份证': r'\\d{17}[\\dXx]',
    'IP地址': r'\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}',
    'URL': r'https?://[^\\s]+',
    '日期YYYY-MM-DD': r'\\d{4}-\\d{2}-\\d{2}',
    '金额': r'¥?[\\d,]+\\.\\d{2}',
    '中文': r'[\\u4e00-\\u9fa5]+',
    '英文单词': r'[a-zA-Z]+'
}

print("\\n常用正则模式:")
for name, pattern in patterns.items():
    print(f"{name}: {pattern}")`
        },
        {
          emoji: '🧹',
          title: '文本清洗实战',
          desc: '去除HTML标签、特殊字符、空格',
          detail: '**业务场景**：爬虫数据清洗、用户输入清洗\\n**易踩坑点**：编码问题、特殊字符\\n**可继续深挖**：Unicode规范化',
          code: `import pandas as pd
import re
import html

# 创建脏数据
df = pd.DataFrame({
    'text': [
        '  Hello  World  ',
        '<p>这是<b>HTML</b>标签</p>',
        '价格：¥1,234.56元',
        '联系我：138-1234-5678 或 zhang@qq.com',
        '特殊字符：@#$%^&*()',
        '中文、English、123、符号！？',
        '&lt;转义符&gt;&nbsp;&amp;',
        '\\n换行符\\t制表符\\r回车符',
    ]
})

# ========== 1. 去除首尾空格 ==========
df['step1'] = df['text'].str.strip()

# ========== 2. 去除多余空格（多个空格变单个）==========
df['step2'] = df['step1'].str.replace(r'\\s+', ' ', regex=True)

# ========== 3. 去除HTML标签 ==========
def remove_html_tags(text):
    if pd.isna(text):
        return text
    # 解码HTML实体
    text = html.unescape(text)
    # 移除HTML标签
    text = re.sub(r'<[^>]+>', '', text)
    return text

df['step3'] = df['step2'].apply(remove_html_tags)

# ========== 4. 去除特殊字符（只保留中英文、数字、基本符号）==========
df['step4'] = df['step3'].str.replace(r'[^\\w\\s，。！？、；：""''（）]', '', regex=True)

# ========== 5. 统一标点符号（中文标点转英文）==========
punctuation_map = {
    '，': ',',
    '。': '.',
    '！': '!',
    '？': '?',
    '；': ';',
    '：': ':',
    '"': '"',
    '"': '"',
    ''': "'",
    ''': "'",
    '（': '(',
    '）': ')'
}

def normalize_punctuation(text):
    if pd.isna(text):
        return text
    for cn, en in punctuation_map.items():
        text = text.replace(cn, en)
    return text

df['step5'] = df['step4'].apply(normalize_punctuation)

# ========== 6. 移除换行符、制表符 ==========
df['step6'] = df['step5'].str.replace(r'[\\n\\t\\r]', ' ', regex=True)

# ========== 7. 统一大小写（可选）==========
df['step7'] = df['step6'].str.lower()

print("文本清洗流程:")
print(df[['text', 'step3', 'step6']])

# ========== 完整清洗函数 ==========
def clean_text(text):
    if pd.isna(text):
        return text
    
    # 1. 去除首尾空格
    text = text.strip()
    
    # 2. 解码HTML实体
    text = html.unescape(text)
    
    # 3. 移除HTML标签
    text = re.sub(r'<[^>]+>', '', text)
    
    # 4. 移除换行、制表、回车
    text = re.sub(r'[\\n\\t\\r]', ' ', text)
    
    # 5. 移除多余空格
    text = re.sub(r'\\s+', ' ', text)
    
    # 6. 移除特殊字符（可选）
    # text = re.sub(r'[^\\w\\s]', '', text)
    
    return text

df['cleaned'] = df['text'].apply(clean_text)
print("\\n完整清洗结果:")
print(df[['text', 'cleaned']])`
        },
        {
          emoji: '📧',
          title: '信息提取（电话、邮箱、身份证）',
          desc: '从文本中提取关键信息',
          detail: '**业务场景**：用户信息提取、数据脱敏\\n**易踩坑点**：正则性能、边界情况\\n**可继续深挖**：NER命名实体识别',
          code: `import pandas as pd
import re

# 创建包含各种信息的文本
df = pd.DataFrame({
    'text': [
        '我的手机是13812345678，邮箱zhang@qq.com',
        '联系方式：139-8765-4321 或 186 1234 5678',
        '身份证号：11010119900101123X',
        '公司电话：010-12345678，手机：+86-13912345678',
        '邮箱：li.si@company.com.cn，备用：wangwu@163.com'
    ]
})

# ========== 提取手机号 ==========
def extract_phone(text):
    if pd.isna(text):
        return None
    # 匹配各种手机号格式
    pattern = r'(?:\\+86[-\\s]?)?1[3-9]\\d[-\\s]?\\d{4}[-\\s]?\\d{4}'
    phones = re.findall(pattern, text)
    if phones:
        # 清洗格式
        return [re.sub(r'[-\\s+86]', '', p) for p in phones]
    return None

df['phones'] = df['text'].apply(extract_phone)

# ========== 提取邮箱 ==========
def extract_email(text):
    if pd.isna(text):
        return None
    pattern = r'[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}'
    emails = re.findall(pattern, text)
    return emails if emails else None

df['emails'] = df['text'].apply(extract_email)

# ========== 提取身份证 ==========
def extract_id_card(text):
    if pd.isna(text):
        return None
    # 18位身份证
    pattern = r'\\d{17}[\\dXx]'
    id_cards = re.findall(pattern, text)
    return id_cards if id_cards else None

df['id_cards'] = df['text'].apply(extract_id_card)

# ========== 验证身份证 ==========
def validate_id_card(id_card):
    if not id_card or len(id_card) != 18:
        return False
    
    # 校验码权重
    weights = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]
    check_codes = ['1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2']
    
    try:
        # 计算校验码
        total = sum(int(id_card[i]) * weights[i] for i in range(17))
        check_code = check_codes[total % 11]
        
        return id_card[-1].upper() == check_code
    except:
        return False

# ========== 验证邮箱 ==========
def validate_email(email):
    if not email:
        return False
    pattern = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$'
    return bool(re.match(pattern, email))

# ========== 验证手机号 ==========
def validate_phone(phone):
    if not phone:
        return False
    # 去除所有非数字字符
    phone_clean = re.sub(r'\\D', '', phone)
    # 中国大陆手机号：11位，1开头
    return len(phone_clean) == 11 and phone_clean[0] == '1'

print("信息提取结果:")
print(df[['text', 'phones', 'emails', 'id_cards']])

# ========== 数据脱敏 ==========
def mask_phone(phone):
    if not phone or len(phone) != 11:
        return phone
    return phone[:3] + '****' + phone[7:]

def mask_email(email):
    if not email or '@' not in email:
        return email
    parts = email.split('@')
    username = parts[0]
    if len(username) <= 2:
        masked = '*' * len(username)
    else:
        masked = username[0] + '*' * (len(username) - 2) + username[-1]
    return masked + '@' + parts[1]

def mask_id_card(id_card):
    if not id_card or len(id_card) != 18:
        return id_card
    return id_card[:6] + '********' + id_card[14:]

# 应用脱敏
masked_df = pd.DataFrame({
    'phone': ['13812345678', '13987654321'],
    'email': ['zhang@qq.com', 'li.si@company.com'],
    'id_card': ['11010119900101123X', '44030119850202456X']
})

masked_df['phone_masked'] = masked_df['phone'].apply(mask_phone)
masked_df['email_masked'] = masked_df['email'].apply(mask_email)
masked_df['id_card_masked'] = masked_df['id_card'].apply(mask_id_card)

print("\\n数据脱敏:")
print(masked_df)`
        },
        {
          emoji: '🇨🇳',
          title: '中文文本处理（jieba分词）',
          desc: '中文分词、关键词提取',
          detail: '**工具**：jieba（结巴分词）\\n**业务场景**：评论分析、关键词提取\\n**可继续深挖**：词性标注、命名实体识别',
          code: `# 安装: pip install jieba
import pandas as pd
import jieba
import jieba.analyse
from collections import Counter

# 创建中文文本数据
df = pd.DataFrame({
    'comment': [
        '这个产品质量非常好，值得购买！',
        '物流速度太慢了，等了一个星期才到',
        '客服服务态度很好，解答很耐心',
        '价格有点贵，但是质量确实不错',
        '包装精美，送朋友很有面子'
    ]
})

# ========== 基础分词 ==========
df['words'] = df['comment'].apply(lambda x: jieba.lcut(x))

print("基础分词:")
print(df[['comment', 'words']])

# ========== 去除停用词 ==========
# 自定义停用词表
stopwords = set(['的', '了', '很', '有', '是', '在', '个', '一'])

def remove_stopwords(words):
    return [w for w in words if w not in stopwords and len(w) > 1]

df['words_clean'] = df['words'].apply(remove_stopwords)

print("\\n去除停用词:")
print(df[['comment', 'words_clean']])

# ========== 关键词提取（TF-IDF）==========
def extract_keywords_tfidf(text, topK=3):
    keywords = jieba.analyse.extract_tags(text, topK=topK, withWeight=True)
    return keywords

df['keywords_tfidf'] = df['comment'].apply(lambda x: extract_keywords_tfidf(x, topK=3))

print("\\n关键词提取（TF-IDF）:")
print(df[['comment', 'keywords_tfidf']])

# ========== 关键词提取（TextRank）==========
def extract_keywords_textrank(text, topK=3):
    keywords = jieba.analyse.textrank(text, topK=topK, withWeight=True)
    return keywords

df['keywords_textrank'] = df['comment'].apply(lambda x: extract_keywords_textrank(x, topK=3))

# ========== 词频统计 ==========
all_words = []
for words in df['words_clean']:
    all_words.extend(words)

word_counts = Counter(all_words)
top_words = word_counts.most_common(10)

print("\\n词频统计Top 10:")
for word, count in top_words:
    print(f"{word}: {count}")

# ========== 自定义词典 ==========
# 添加自定义词汇（提高分词准确性）
jieba.add_word('客服服务')
jieba.add_word('物流速度')

df['words_custom'] = df['comment'].apply(lambda x: jieba.lcut(x))

print("\\n添加自定义词典后:")
print(df[['comment', 'words_custom']])

# ========== 情感词典（简单版）==========
positive_words = set(['好', '不错', '精美', '耐心', '值得'])
negative_words = set(['慢', '贵', '差'])

def sentiment_score(words):
    pos_count = sum(1 for w in words if w in positive_words)
    neg_count = sum(1 for w in words if w in negative_words)
    return pos_count - neg_count

df['sentiment'] = df['words_clean'].apply(sentiment_score)
df['sentiment_label'] = df['sentiment'].apply(
    lambda x: '正面' if x > 0 else ('负面' if x < 0 else '中性')
)

print("\\n情感分析:")
print(df[['comment', 'sentiment', 'sentiment_label']])

# ========== 词云数据准备 ==========
# 准备词云所需的词频数据
wordcloud_data = ' '.join(all_words)
print("\\n词云数据（前100字符）:")
print(wordcloud_data[:100])`
        }
      ]
    },
    {
      id: 'time-series-advanced',
      title: 'PART 18 时间序列深度分析',
      subtitle: '时间数据处理进阶 —— 从基础到高级应用',
      items: [
        {
          emoji: '📅',
          title: '时间序列分解 ☆',
          desc: '趋势、季节性、残差三要素分析',
          detail: '**模型**：加法模型、乘法模型\\n**业务应用**：销售预测、异常检测\\n**可继续深挖**：STL分解',
          code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from statsmodels.tsa.seasonal import seasonal_decompose

# 创建时间序列数据
dates = pd.date_range('2022-01-01', periods=365, freq='D')
trend = np.linspace(100, 200, 365)
seasonal = 20 * np.sin(np.linspace(0, 4*np.pi, 365))
noise = np.random.randn(365) * 5
sales = trend + seasonal + noise

df = pd.DataFrame({
    'date': dates,
    'sales': sales
})
df.set_index('date', inplace=True)

# ========== 时间序列分解 ==========
# 加法模型：Y = T + S + R（趋势+季节性+残差）
decomposition_add = seasonal_decompose(
    df['sales'], 
    model='additive', 
    period=30  # 季节周期（30天）
)

# 乘法模型：Y = T * S * R
decomposition_mul = seasonal_decompose(
    df['sales'], 
    model='multiplicative', 
    period=30
)

# ========== 可视化分解结果 ==========
fig, axes = plt.subplots(4, 1, figsize=(14, 10))

# 原始数据
df['sales'].plot(ax=axes[0], color='#19bcc8')
axes[0].set_title('原始销售数据', fontsize=14, fontweight='bold')
axes[0].set_ylabel('销售额')

# 趋势
decomposition_add.trend.plot(ax=axes[1], color='#17a8b4')
axes[1].set_title('趋势（Trend）', fontsize=14, fontweight='bold')
axes[1].set_ylabel('趋势值')

# 季节性
decomposition_add.seasonal.plot(ax=axes[2], color='#1596a2')
axes[2].set_title('季节性（Seasonal）', fontsize=14, fontweight='bold')
axes[2].set_ylabel('季节性波动')

# 残差
decomposition_add.resid.plot(ax=axes[3], color='#138490')
axes[3].set_title('残差（Residual）', fontsize=14, fontweight='bold')
axes[3].set_ylabel('残差')

plt.tight_layout()
plt.savefig('time_series_decomposition.png', dpi=300)

# ========== 提取各成分 ==========
trend_component = decomposition_add.trend
seasonal_component = decomposition_add.seasonal
residual_component = decomposition_add.resid

print("趋势成分统计:")
print(trend_component.describe())

print("\\n季节性成分统计:")
print(seasonal_component.describe())

print("\\n残差成分统计:")
print(residual_component.describe())

# ========== 异常检测（基于残差）==========
# 残差超过3倍标准差视为异常
std_resid = residual_component.std()
anomalies = residual_component[abs(residual_component) > 3 * std_resid]

print(f"\\n检测到 {len(anomalies)} 个异常点:")
print(anomalies)`
        },
        {
          emoji: '📊',
          title: '滚动统计（Rolling & Expanding）☆',
          desc: '移动平均、累计统计',
          detail: '**核心**：rolling（滑动窗口）、expanding（累积窗口）\\n**业务应用**：平滑曲线、累计指标\\n**可继续深挖**：指数加权移动平均（EWM）',
          code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 创建股票价格数据
dates = pd.date_range('2024-01-01', periods=100, freq='D')
price = 100 + np.cumsum(np.random.randn(100) * 2)
df = pd.DataFrame({
    'date': dates,
    'price': price
})
df.set_index('date', inplace=True)

# ========== 滚动窗口统计（rolling）==========
# 7日移动平均
df['MA_7'] = df['price'].rolling(window=7).mean()

# 30日移动平均
df['MA_30'] = df['price'].rolling(window=30).mean()

# 滚动标准差（波动率）
df['volatility'] = df['price'].rolling(window=7).std()

# 滚动最大值、最小值
df['rolling_max'] = df['price'].rolling(window=7).max()
df['rolling_min'] = df['price'].rolling(window=7).min()

print("滚动统计:")
print(df[['price', 'MA_7', 'MA_30', 'volatility']].head(35))

# ========== 累计统计（expanding）==========
# 累计均值（从开始到当前）
df['cumulative_mean'] = df['price'].expanding().mean()

# 累计最大值
df['cumulative_max'] = df['price'].expanding().max()

# 累计最小值
df['cumulative_min'] = df['price'].expanding().min()

print("\\n累计统计:")
print(df[['price', 'cumulative_mean', 'cumulative_max', 'cumulative_min']].head(10))

# ========== 指数加权移动平均（EWM）==========
# 相比简单移动平均，EWM对近期数据权重更大
df['EMA_12'] = df['price'].ewm(span=12).mean()
df['EMA_26'] = df['price'].ewm(span=26).mean()

# MACD指标（股票技术分析常用）
df['MACD'] = df['EMA_12'] - df['EMA_26']

print("\\n指数加权移动平均:")
print(df[['price', 'EMA_12', 'EMA_26', 'MACD']].head(30))

# ========== 可视化 ==========
fig, axes = plt.subplots(3, 1, figsize=(14, 10))

# 子图1：价格与移动平均线
df['price'].plot(ax=axes[0], label='原始价格', color='#19bcc8', alpha=0.5)
df['MA_7'].plot(ax=axes[0], label='7日均线', color='#17a8b4', linewidth=2)
df['MA_30'].plot(ax=axes[0], label='30日均线', color='#1596a2', linewidth=2)
axes[0].set_title('价格与移动平均线', fontsize=14, fontweight='bold')
axes[0].legend()
axes[0].grid(alpha=0.3)

# 子图2：波动率
df['volatility'].plot(ax=axes[1], color='#ff6b6b', linewidth=2)
axes[1].set_title('7日滚动波动率', fontsize=14, fontweight='bold')
axes[1].grid(alpha=0.3)

# 子图3：MACD
df['MACD'].plot(ax=axes[2], color='#138490', linewidth=2)
axes[2].axhline(y=0, color='gray', linestyle='--')
axes[2].set_title('MACD指标', fontsize=14, fontweight='bold')
axes[2].grid(alpha=0.3)

plt.tight_layout()
plt.savefig('rolling_statistics.png', dpi=300)

# ========== 高级用法：自定义滚动函数 ==========
def custom_range(x):
    return x.max() - x.min()

df['rolling_range'] = df['price'].rolling(window=7).apply(custom_range)

print("\\n自定义滚动函数（7日价格极差）:")
print(df[['price', 'rolling_range']].head(10))`
        },
        {
          emoji: '⏰',
          title: '时间窗口操作高级技巧',
          desc: 'resample、时区转换、工作日处理',
          detail: '**核心**：重采样、时区处理、业务日历\\n**业务应用**：数据聚合、跨时区分析\\n**可继续深挖**：自定义频率、偏移量',
          code: `import pandas as pd
import numpy as np
from pandas.tseries.offsets import BDay, MonthEnd

# 创建每小时数据
dates = pd.date_range('2024-01-01', periods=24*7, freq='H')
df = pd.DataFrame({
    'timestamp': dates,
    'value': np.random.randint(10, 100, 24*7)
})
df.set_index('timestamp', inplace=True)

# ========== resample 重采样 ==========
# 小时数据 → 天数据
daily = df.resample('D').agg({
    'value': ['sum', 'mean', 'max', 'min', 'count']
})
print("小时→天（重采样）:")
print(daily.head())

# 小时数据 → 周数据
weekly = df.resample('W').sum()
print("\\n小时→周:")
print(weekly.head())

# 向前填充（ffill）和向后填充（bfill）
daily_ffill = df.resample('D').ffill()
daily_bfill = df.resample('D').bfill()

# ========== 自定义聚合 ==========
def custom_agg(x):
    return {
        '总和': x.sum(),
        '均值': x.mean(),
        '中位数': x.median(),
        '标准差': x.std()
    }

daily_custom = df.resample('D')['value'].apply(custom_agg).apply(pd.Series)
print("\\n自定义聚合:")
print(daily_custom.head())

# ========== 时区处理 ==========
# 添加时区信息
df_tz = df.copy()
df_tz.index = df_tz.index.tz_localize('UTC')

# 转换时区
df_beijing = df_tz.tz_convert('Asia/Shanghai')
df_newyork = df_tz.tz_convert('America/New_York')

print("\\n时区转换:")
print(f"UTC时间: {df_tz.index[0]}")
print(f"北京时间: {df_beijing.index[0]}")
print(f"纽约时间: {df_newyork.index[0]}")

# ========== 工作日处理 ==========
# 创建工作日日期范围
business_days = pd.bdate_range('2024-01-01', '2024-12-31')
print(f"\\n2024年工作日数量: {len(business_days)}")

# 获取下一个工作日
from datetime import datetime
today = pd.Timestamp('2024-01-06')  # 周六
next_bday = today + BDay(1)
print(f"今天: {today.strftime('%Y-%m-%d %A')}")
print(f"下个工作日: {next_bday.strftime('%Y-%m-%d %A')}")

# 获取月末日期
month_end = pd.Timestamp('2024-01-15') + MonthEnd(0)
print(f"\\n2024-01-15的月末: {month_end}")

# ========== 中国节假日处理（需自定义）==========
# 自定义节假日列表
holidays = pd.to_datetime([
    '2024-01-01',  # 元旦
    '2024-02-10', '2024-02-11', '2024-02-12',  # 春节
    '2024-04-04', '2024-04-05', '2024-04-06',  # 清明
    '2024-05-01', '2024-05-02', '2024-05-03',  # 劳动节
    '2024-10-01', '2024-10-02', '2024-10-03'   # 国庆
])

# 创建自定义工作日日历
from pandas.tseries.holiday import AbstractHolidayCalendar, Holiday
class ChinaHolidayCalendar(AbstractHolidayCalendar):
    rules = [Holiday(name, year=2024, month=h.month, day=h.day) 
             for name, h in zip(['Holiday']*len(holidays), holidays)]

# 生成包含节假日的日期范围
china_bdays = pd.bdate_range('2024-01-01', '2024-12-31', 
                              freq='C', holidays=holidays)
print(f"\\n2024年中国工作日数量（含节假日）: {len(china_bdays)}")

# ========== 时间偏移 ==========
base_date = pd.Timestamp('2024-01-15')
print(f"\\n基准日期: {base_date}")
print(f"3天后: {base_date + pd.Timedelta(days=3)}")
print(f"2周后: {base_date + pd.Timedelta(weeks=2)}")
print(f"1个月后: {base_date + pd.DateOffset(months=1)}")
print(f"3个工作日后: {base_date + BDay(3)}")`
        },
        {
          emoji: '📈',
          title: '同比、环比计算模板',
          desc: 'YoY、MoM、QoQ增长率计算',
          detail: '**业务场景**：销售分析、KPI监控\\n**公式**：(本期-上期)/上期*100%\\n**可继续深挖**：CAGR复合增长率',
          code: `import pandas as pd
import numpy as np

# 创建月度销售数据
dates = pd.date_range('2022-01-01', periods=36, freq='MS')
sales = 1000 + np.cumsum(np.random.randn(36) * 50)
df = pd.DataFrame({
    'date': dates,
    'sales': sales
})
df['year'] = df['date'].dt.year
df['month'] = df['date'].dt.month
df['quarter'] = df['date'].dt.quarter

# ========== 环比（MoM - Month over Month）==========
# 本月相比上月的增长率
df['sales_last_month'] = df['sales'].shift(1)
df['MoM'] = (df['sales'] - df['sales_last_month']) / df['sales_last_month'] * 100

# ========== 同比（YoY - Year over Year）==========
# 本月相比去年同期的增长率
df['sales_last_year'] = df['sales'].shift(12)
df['YoY'] = (df['sales'] - df['sales_last_year']) / df['sales_last_year'] * 100

# ========== 季度环比（QoQ - Quarter over Quarter）==========
# 按季度聚合
quarterly = df.groupby(['year', 'quarter'])['sales'].sum().reset_index()
quarterly['sales_last_quarter'] = quarterly['sales'].shift(1)
quarterly['QoQ'] = (quarterly['sales'] - quarterly['sales_last_quarter']) / quarterly['sales_last_quarter'] * 100

print("环比、同比分析:")
print(df[['date', 'sales', 'MoM', 'YoY']].tail(15))

print("\\n季度环比分析:")
print(quarterly)

# ========== 滚动同比（12个月移动平均的同比）==========
df['MA_12'] = df['sales'].rolling(window=12).mean()
df['MA_12_last_year'] = df['MA_12'].shift(12)
df['YoY_MA'] = (df['MA_12'] - df['MA_12_last_year']) / df['MA_12_last_year'] * 100

# ========== CAGR（复合年均增长率）==========
def calculate_cagr(start_value, end_value, years):
    return (pow(end_value / start_value, 1 / years) - 1) * 100

# 计算3年CAGR
first_year_sales = df[df['year'] == 2022]['sales'].sum()
last_year_sales = df[df['year'] == 2024]['sales'].sum()
cagr_3y = calculate_cagr(first_year_sales, last_year_sales, 3)

print(f"\\n3年CAGR: {cagr_3y:.2f}%")

# ========== 可视化 ==========
import matplotlib.pyplot as plt

fig, axes = plt.subplots(2, 1, figsize=(14, 10))

# 子图1：销售额与增长率
ax1 = axes[0]
ax2 = ax1.twinx()

ax1.plot(df['date'], df['sales'], color='#19bcc8', linewidth=2, label='销售额')
ax2.plot(df['date'], df['YoY'], color='#ff6b6b', linewidth=2, label='同比增长率', linestyle='--')
ax2.axhline(y=0, color='gray', linestyle='-', alpha=0.5)

ax1.set_xlabel('日期')
ax1.set_ylabel('销售额', color='#19bcc8')
ax2.set_ylabel('同比增长率(%)', color='#ff6b6b')
ax1.set_title('销售额与同比增长率', fontsize=14, fontweight='bold')
ax1.legend(loc='upper left')
ax2.legend(loc='upper right')
ax1.grid(alpha=0.3)

# 子图2：环比vs同比
axes[1].plot(df['date'], df['MoM'], color='#17a8b4', linewidth=2, label='环比(MoM)')
axes[1].plot(df['date'], df['YoY'], color='#ff6b6b', linewidth=2, label='同比(YoY)')
axes[1].axhline(y=0, color='gray', linestyle='-', alpha=0.5)
axes[1].set_xlabel('日期')
axes[1].set_ylabel('增长率(%)')
axes[1].set_title('环比vs同比增长率对比', fontsize=14, fontweight='bold')
axes[1].legend()
axes[1].grid(alpha=0.3)

plt.tight_layout()
plt.savefig('yoy_mom_analysis.png', dpi=300)

# ========== 业务应用：识别异常增长 ==========
# YoY增长率超过±30%视为异常
anomaly_growth = df[(abs(df['YoY']) > 30)][['date', 'sales', 'YoY']]
print("\\n异常增长月份:")
print(anomaly_growth)`
        },
        {
          emoji: '🔄',
          title: '用户留存分析（Cohort Analysis）',
          desc: '队列分析，计算用户留存率',
          detail: '**业务价值**：衡量产品粘性、用户生命周期\\n**核心指标**：次日留存、7日留存、30日留存\\n**可继续深挖**：留存曲线、用户分群',
          code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns

# 创建用户行为数据
np.random.seed(42)
user_ids = range(1, 1001)
dates = pd.date_range('2024-01-01', periods=90, freq='D')

# 生成用户活跃记录
records = []
for user_id in user_ids:
    # 用户首次登录日期
    first_login = np.random.choice(dates[:30])
    records.append({
        'user_id': user_id,
        'date': first_login,
        'is_new_user': 1
    })
    
    # 后续活跃（留存率逐渐下降）
    current_date = first_login
    retention_prob = 0.8
    for i in range(60):
        if np.random.rand() < retention_prob:
            current_date += pd.Timedelta(days=1)
            if current_date in dates:
                records.append({
                    'user_id': user_id,
                    'date': current_date,
                    'is_new_user': 0
                })
        retention_prob *= 0.98  # 留存率递减

df = pd.DataFrame(records)

# ========== 确定用户首次活跃日期（队列）==========
user_cohort = df.groupby('user_id')['date'].min().reset_index()
user_cohort.columns = ['user_id', 'cohort_date']
user_cohort['cohort'] = user_cohort['cohort_date'].dt.to_period('D')

# 合并队列信息
df = df.merge(user_cohort, on='user_id')

# ========== 计算用户活跃天数（相对于首次活跃）==========
df['days_since_first'] = (df['date'] - df['cohort_date']).dt.days

# ========== 构建留存矩阵 ==========
retention_matrix = df.groupby(['cohort', 'days_since_first'])['user_id'].nunique().reset_index()
retention_matrix.columns = ['cohort', 'days', 'active_users']

# 获取每个队列的初始用户数
cohort_sizes = user_cohort.groupby('cohort')['user_id'].nunique()

# 计算留存率
retention_matrix = retention_matrix.set_index(['cohort', 'days'])['active_users'].unstack()
retention_rate = retention_matrix.divide(cohort_sizes, axis=0) * 100

print("留存率矩阵（%）:")
print(retention_rate.iloc[:10, :8])  # 显示前10个队列，前8天

# ========== 关键指标：次日、7日、30日留存 ==========
if 1 in retention_rate.columns:
    day1_retention = retention_rate[1].mean()
    print(f"\\n平均次日留存率: {day1_retention:.2f}%")

if 7 in retention_rate.columns:
    day7_retention = retention_rate[7].mean()
    print(f"平均7日留存率: {day7_retention:.2f}%")

if 30 in retention_rate.columns:
    day30_retention = retention_rate[30].mean()
    print(f"平均30日留存率: {day30_retention:.2f}%")

# ========== 可视化：留存热力图 ==========
plt.figure(figsize=(14, 8))
sns.heatmap(
    retention_rate.iloc[:, :15],  # 显示前15天
    annot=True,
    fmt='.1f',
    cmap='YlGnBu',
    cbar_kws={'label': '留存率(%)'}
)
plt.title('用户留存率热力图', fontsize=16, fontweight='bold')
plt.xlabel('距首次活跃天数')
plt.ylabel('用户队列（首次活跃日期）')
plt.tight_layout()
plt.savefig('cohort_retention_heatmap.png', dpi=300)

# ========== 可视化：留存曲线 ==========
plt.figure(figsize=(14, 6))
for cohort in retention_rate.index[:5]:  # 展示前5个队列
    plt.plot(retention_rate.columns[:15], 
             retention_rate.loc[cohort, :15], 
             marker='o', 
             label=str(cohort))

plt.xlabel('距首次活跃天数')
plt.ylabel('留存率(%)')
plt.title('用户留存曲线对比', fontsize=16, fontweight='bold')
plt.legend(title='用户队列')
plt.grid(alpha=0.3)
plt.tight_layout()
plt.savefig('retention_curves.png', dpi=300)

print("\\n✅ 留存分析完成")`
        }
      ]
    },
    {
      id: 'project-case',
      title: 'PART 19 完整项目实战',
      subtitle: '从数据获取到报告输出 —— 电商用户行为分析完整案例',
      items: [
        {
          emoji: '🎯',
          title: '项目背景与目标',
          desc: '某电商平台想了解用户购买行为，优化运营策略',
          detail: '**业务目标**：提升用户转化率和复购率\\n**数据来源**：用户行为日志、订单数据、用户信息\\n**分析周期**：最近3个月数据',
          code: `"""
项目：电商用户行为分析
业务目标：
1. 了解用户购买路径和转化漏斗
2. 识别高价值用户群体（RFM模型）
3. 分析用户留存和流失情况
4. 提供运营优化建议

数据集说明：
- user_behavior.csv: 用户行为日志（浏览、收藏、加购、购买）
- orders.csv: 订单数据
- users.csv: 用户基本信息

分析框架：
1. 数据获取与清洗
2. 探索性数据分析（EDA）
3. 用户行为路径分析
4. RFM客户价值分析
5. 留存分析
6. 可视化Dashboard
7. 结论与建议
"""`
        },
        {
          emoji: '📥',
          title: '数据获取与清洗',
          desc: '加载数据、处理缺失值、数据类型转换',
          detail: '**重点**：数据质量检查、异常值处理\\n**易踩坑点**：日期格式、重复数据\\n**输出**：干净的可分析数据集',
          code: `import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime

# 1. 加载数据
behavior = pd.read_csv('user_behavior.csv')
orders = pd.read_csv('orders.csv')
users = pd.read_csv('users.csv')

# 2. 数据概览
print("行为数据:", behavior.shape)
print("订单数据:", orders.shape)
print("用户数据:", users.shape)

behavior.info()
behavior.head()

# 3. 数据清洗
# 3.1 处理缺失值
print("缺失值统计:\\n", behavior.isnull().sum())
behavior = behavior.dropna(subset=['user_id', 'item_id'])

# 3.2 数据类型转换
behavior['timestamp'] = pd.to_datetime(behavior['timestamp'])
orders['order_date'] = pd.to_datetime(orders['order_date'])

# 3.3 删除重复值
behavior = behavior.drop_duplicates()
orders = orders.drop_duplicates(subset=['order_id'])

# 3.4 异常值处理
# 删除异常金额订单
Q1 = orders['amount'].quantile(0.25)
Q3 = orders['amount'].quantile(0.75)
IQR = Q3 - Q1
orders = orders[(orders['amount'] >= Q1 - 1.5*IQR) & 
                (orders['amount'] <= Q3 + 1.5*IQR)]

# 3.5 添加时间特征
behavior['date'] = behavior['timestamp'].dt.date
behavior['hour'] = behavior['timestamp'].dt.hour
behavior['dayofweek'] = behavior['timestamp'].dt.dayofweek

# 4. 数据合并
df = pd.merge(behavior, users, on='user_id', how='left')

print("\\n清洗后数据:", df.shape)
print("数据时间范围:", df['timestamp'].min(), "至", df['timestamp'].max())`
        },
        {
          emoji: '🔍',
          title: '探索性数据分析（EDA）',
          desc: '用户行为分布、转化漏斗、时间趋势',
          detail: '**重点**：发现数据规律和异常\\n**可视化**：柱状图、折线图、漏斗图\\n**输出**：EDA报告和关键发现',
          code: `# 1. 用户行为分布
behavior_dist = behavior['behavior_type'].value_counts()
print("用户行为分布:\\n", behavior_dist)

plt.figure(figsize=(10, 6))
behavior_dist.plot(kind='bar', color='#19bcc8')
plt.title('用户行为类型分布', fontsize=16)
plt.ylabel('次数')
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig('behavior_distribution.png', dpi=300)

# 2. 转化漏斗分析
funnel = behavior.groupby('behavior_type')['user_id'].nunique()
funnel_ordered = funnel[['浏览', '收藏', '加购', '购买']]
conversion_rate = (funnel_ordered / funnel_ordered['浏览'] * 100).round(2)

print("\\n转化漏斗:")
print(funnel_ordered)
print("\\n转化率:")
print(conversion_rate)

# 3. 日活跃用户趋势
daily_users = behavior.groupby('date')['user_id'].nunique()
plt.figure(figsize=(12, 6))
daily_users.plot(color='#19bcc8', linewidth=2)
plt.title('日活跃用户趋势', fontsize=16)
plt.ylabel('活跃用户数')
plt.grid(alpha=0.3)
plt.tight_layout()
plt.savefig('daily_active_users.png', dpi=300)

# 4. 时段分布
hourly_behavior = behavior.groupby('hour').size()
plt.figure(figsize=(12, 6))
hourly_behavior.plot(kind='bar', color='#19bcc8')
plt.title('用户行为时段分布', fontsize=16)
plt.xlabel('小时')
plt.ylabel('行为次数')
plt.tight_layout()
plt.savefig('hourly_distribution.png', dpi=300)

# 5. 购买金额分布
plt.figure(figsize=(10, 6))
orders['amount'].hist(bins=50, color='#19bcc8', alpha=0.7)
plt.title('订单金额分布', fontsize=16)
plt.xlabel('金额（元）')
plt.ylabel('订单数')
plt.tight_layout()
plt.savefig('amount_distribution.png', dpi=300)

# 6. 关键发现
print("\\n关键发现:")
print(f"1. 总用户数: {behavior['user_id'].nunique():,}")
print(f"2. 总订单数: {orders.shape[0]:,}")
print(f"3. 平均订单金额: ¥{orders['amount'].mean():.2f}")
print(f"4. 浏览到购买转化率: {conversion_rate['购买']:.2f}%")`
        },
        {
          emoji: '👥',
          title: 'RFM客户价值分析',
          desc: '识别高价值用户，进行精准营销',
          detail: '**RFM模型**：Recency（最近购买）、Frequency（购买频次）、Monetary（购买金额）\\n**输出**：客户分群结果\\n**应用**：精准营销、客户关系管理',
          code: `# RFM分析
analysis_date = orders['order_date'].max()

rfm = orders.groupby('user_id').agg({
    'order_date': lambda x: (analysis_date - x.max()).days,  # Recency
    'order_id': 'count',  # Frequency
    'amount': 'sum'  # Monetary
}).rename(columns={
    'order_date': 'Recency',
    'order_id': 'Frequency',
    'amount': 'Monetary'
})

# 计算RFM分数（1-5分）
rfm['R_Score'] = pd.qcut(rfm['Recency'], 5, labels=[5,4,3,2,1])
rfm['F_Score'] = pd.qcut(rfm['Frequency'].rank(method='first'), 5, labels=[1,2,3,4,5])
rfm['M_Score'] = pd.qcut(rfm['Monetary'].rank(method='first'), 5, labels=[1,2,3,4,5])

# RFM总分
rfm['RFM_Score'] = rfm['R_Score'].astype(str) + rfm['F_Score'].astype(str) + rfm['M_Score'].astype(str)

# 客户分群
def rfm_segment(row):
    if row['R_Score'] >= 4 and row['F_Score'] >= 4 and row['M_Score'] >= 4:
        return '重要价值客户'
    elif row['R_Score'] >= 4 and row['F_Score'] < 4:
        return '重要发展客户'
    elif row['R_Score'] < 4 and row['F_Score'] >= 4:
        return '重要保持客户'
    elif row['R_Score'] >= 3:
        return '一般客户'
    else:
        return '流失风险客户'

rfm['客户群体'] = rfm.apply(rfm_segment, axis=1)

# 客户分群统计
segment_summary = rfm.groupby('客户群体').agg({
    'Recency': 'mean',
    'Frequency': 'mean',
    'Monetary': 'sum'
}).round(2)

print("\\nRFM客户分群结果:")
print(rfm['客户群体'].value_counts())
print("\\n各群体特征:")
print(segment_summary)

# 可视化
plt.figure(figsize=(10, 6))
rfm['客户群体'].value_counts().plot(kind='bar', color='#19bcc8')
plt.title('客户群体分布', fontsize=16)
plt.ylabel('客户数量')
plt.xticks(rotation=45)
plt.tight_layout()
plt.savefig('rfm_segments.png', dpi=300)

# 导出RFM结果
rfm.reset_index().to_excel('rfm_analysis.xlsx', index=False)`
        },
        {
          emoji: '📈',
          title: '可视化Dashboard',
          desc: '用Plotly创建交互式数据看板',
          detail: '**重点**：交互式图表、多维度展示\\n**工具**：Plotly、Matplotlib\\n**输出**：HTML格式Dashboard',
          code: `import plotly.graph_objects as go
from plotly.subplots import make_subplots
import plotly.express as px

# 1. 创建子图布局（2x2）
fig = make_subplots(
    rows=2, cols=2,
    subplot_titles=('用户行为漏斗', '日活跃用户趋势', 'RFM客户分群', '时段行为热力图'),
    specs=[[{"type": "funnel"}, {"type": "scatter"}],
           [{"type": "bar"}, {"type": "heatmap"}]]
)

# 2. 转化漏斗图
funnel_data = behavior.groupby('behavior_type')['user_id'].nunique()
fig.add_trace(
    go.Funnel(
        y=['浏览', '收藏', '加购', '购买'],
        x=[funnel_data.get('浏览', 0), funnel_data.get('收藏', 0), 
           funnel_data.get('加购', 0), funnel_data.get('购买', 0)],
        textinfo="value+percent previous",
        marker=dict(color=['#19bcc8', '#17a8b4', '#1596a2', '#138490'])
    ),
    row=1, col=1
)

# 3. 日活跃趋势图
daily_users = behavior.groupby('date')['user_id'].nunique()
fig.add_trace(
    go.Scatter(
        x=daily_users.index,
        y=daily_users.values,
        mode='lines+markers',
        line=dict(color='#19bcc8', width=2),
        fill='tozeroy',
        fillcolor='rgba(25, 188, 200, 0.2)'
    ),
    row=1, col=2
)

# 4. RFM客户分群柱状图
segment_counts = rfm['客户群体'].value_counts()
fig.add_trace(
    go.Bar(
        x=segment_counts.index,
        y=segment_counts.values,
        marker_color='#19bcc8',
        text=segment_counts.values,
        textposition='auto'
    ),
    row=2, col=1
)

# 5. 时段行为热力图
hourly_dow = behavior.groupby(['dayofweek', 'hour']).size().unstack(fill_value=0)
fig.add_trace(
    go.Heatmap(
        z=hourly_dow.values,
        x=list(range(24)),
        y=['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        colorscale='Teal',
        showscale=True
    ),
    row=2, col=2
)

# 更新布局
fig.update_layout(
    title_text="电商用户行为分析 Dashboard",
    title_font_size=24,
    showlegend=False,
    height=900,
    width=1400
)

# 保存为HTML
fig.write_html('dashboard.html')
print("\\n✅ 交互式Dashboard已生成: dashboard.html")

# 额外：单独的高级图表
# 6. RFM 3D散点图
fig_3d = px.scatter_3d(
    rfm.reset_index(), 
    x='Recency', 
    y='Frequency', 
    z='Monetary',
    color='客户群体',
    size='Monetary',
    hover_data=['user_id'],
    title='RFM 3D客户分群可视化',
    color_discrete_sequence=px.colors.qualitative.Set2
)
fig_3d.write_html('rfm_3d.html')

print("✅ RFM 3D可视化已生成: rfm_3d.html")`
        },
        {
          emoji: '📊',
          title: '生成分析报告',
          desc: '整合所有分析结果，输出Excel报告',
          detail: '**输出**：包含多个sheet的Excel报告\\n**内容**：数据概览、转化分析、RFM分群、运营建议\\n**格式**：专业、易读、可执行',
          code: `# 生成综合分析报告
with pd.ExcelWriter('电商用户行为分析报告.xlsx', engine='openpyxl') as writer:
    # Sheet1: 数据概览
    summary = pd.DataFrame({
        '指标': ['总用户数', '总订单数', '总GMV', '平均订单金额', '浏览-购买转化率'],
        '数值': [
            f"{behavior['user_id'].nunique():,}",
            f"{orders.shape[0]:,}",
            f"¥{orders['amount'].sum():,.2f}",
            f"¥{orders['amount'].mean():.2f}",
            f"{conversion_rate['购买']:.2f}%"
        ]
    })
    summary.to_excel(writer, sheet_name='数据概览', index=False)
    
    # Sheet2: 行为分布
    behavior_dist.to_excel(writer, sheet_name='行为分布')
    
    # Sheet3: RFM分群
    rfm.reset_index().to_excel(writer, sheet_name='RFM分析', index=False)
    
    # Sheet4: 客户分群统计
    segment_summary.to_excel(writer, sheet_name='客户分群统计')
    
    # Sheet5: 运营建议
    suggestions = pd.DataFrame({
        '客户群体': ['重要价值客户', '重要发展客户', '重要保持客户', '一般客户', '流失风险客户'],
        '运营策略': [
            'VIP服务、专属优惠、优先体验新品',
            '增加互动、提升购买频次、会员权益吸引',
            '维护关系、定期关怀、防止流失',
            '促销活动、提升参与度',
            '召回活动、大额优惠券、了解流失原因'
        ]
    })
    suggestions.to_excel(writer, sheet_name='运营建议', index=False)

print("\\n✅ 分析报告已生成: 电商用户行为分析报告.xlsx")
print("\\n📊 报告包含5个sheet:")
print("   1. 数据概览")
print("   2. 行为分布")
print("   3. RFM分析")
print("   4. 客户分群统计")
print("   5. 运营建议")

# 项目总结
print("\\n" + "="*50)
print("项目完成总结")
print("="*50)
print("✓ 数据清洗完成")
print("✓ 探索性分析完成")
print("✓ RFM客户分群完成")
print("✓ 可视化图表生成完成")
print("✓ Excel报告导出完成")
print("\\n下一步：将分析结果应用到实际运营中！")`
        }
      ]
    },
    {
      id: 'project-sales',
      title: 'PART 17 销售额预测实战',
      subtitle: '时间序列预测 —— 用Python预测未来销售趋势',
      items: [
        {
          emoji: '📋',
          title: '项目背景与数据准备',
          desc: '某零售企业需要预测未来3个月的销售额，优化库存和营销计划',
          detail: '**业务目标**：预测未来销售额，降低库存成本\\n**数据**：历史销售数据（2年）\\n**方法**：ARIMA、Prophet、XGBoost',
          code: `"""
项目：销售额预测
业务场景：零售企业月度销售预测
数据：2022-01 至 2024-12 的月度销售数据
目标：预测2025年1-3月销售额

技术栈：
- Pandas：数据处理
- Statsmodels：ARIMA模型
- Prophet：Facebook时间序列预测
- XGBoost：机器学习预测
- Matplotlib/Plotly：可视化
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from datetime import datetime
import warnings
warnings.filterwarnings('ignore')

# 1. 加载数据
df = pd.read_csv('sales_data.csv', parse_dates=['date'])
df = df.sort_values('date').reset_index(drop=True)

print("数据形状:", df.shape)
print("\\n数据预览:")
print(df.head())
print("\\n数据统计:")
print(df.describe())

# 2. 可视化历史趋势
plt.figure(figsize=(14, 6))
plt.plot(df['date'], df['sales'], marker='o', linewidth=2, color='#19bcc8')
plt.title('历史销售额趋势（2022-2024）', fontsize=16, fontweight='bold')
plt.xlabel('日期')
plt.ylabel('销售额（万元）')
plt.grid(alpha=0.3)
plt.tight_layout()
plt.savefig('sales_trend.png', dpi=300)
plt.show()

# 3. 数据分解（趋势、季节性、残差）
from statsmodels.tsa.seasonal import seasonal_decompose

decomposition = seasonal_decompose(df.set_index('date')['sales'], 
                                   model='multiplicative', period=12)

fig, axes = plt.subplots(4, 1, figsize=(14, 10))
df.set_index('date')['sales'].plot(ax=axes[0], color='#19bcc8')
axes[0].set_title('原始数据')
decomposition.trend.plot(ax=axes[1], color='#17a8b4')
axes[1].set_title('趋势')
decomposition.seasonal.plot(ax=axes[2], color='#1596a2')
axes[2].set_title('季节性')
decomposition.resid.plot(ax=axes[3], color='#138490')
axes[3].set_title('残差')
plt.tight_layout()
plt.savefig('decomposition.png', dpi=300)

print("\\n✅ 数据探索完成")`
        },
        {
          emoji: '📈',
          title: '方法1：ARIMA模型',
          desc: '经典时间序列预测模型',
          detail: '**优点**：统计学原理，可解释性强\\n**适用**：有明显趋势和季节性的数据\\n**参数**：p（自回归）、d（差分）、q（移动平均）',
          code: `from statsmodels.tsa.arima.model import ARIMA
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
from sklearn.metrics import mean_absolute_error, mean_squared_error

# 1. 划分训练集和测试集
train_size = int(len(df) * 0.8)
train = df[:train_size]
test = df[train_size:]

print(f"训练集: {train.shape[0]} 个月")
print(f"测试集: {test.shape[0]} 个月")

# 2. 确定ARIMA参数（p, d, q）
# 方法1：自动搜索最优参数
import itertools

p = d = q = range(0, 3)
pdq = list(itertools.product(p, d, q))
seasonal_pdq = [(x[0], x[1], x[2], 12) for x in pdq]

best_aic = np.inf
best_params = None

for param in pdq:
    for param_seasonal in seasonal_pdq:
        try:
            model = ARIMA(train['sales'], order=param, 
                         seasonal_order=param_seasonal)
            results = model.fit()
            if results.aic < best_aic:
                best_aic = results.aic
                best_params = (param, param_seasonal)
        except:
            continue

print(f"\\n最优参数: {best_params}")
print(f"最优AIC: {best_aic:.2f}")

# 3. 训练最优模型
model = ARIMA(train['sales'], 
              order=best_params[0], 
              seasonal_order=best_params[1])
fitted_model = model.fit()

print("\\n模型摘要:")
print(fitted_model.summary())

# 4. 预测
forecast_steps = len(test)
forecast = fitted_model.forecast(steps=forecast_steps)

# 5. 评估
mae = mean_absolute_error(test['sales'], forecast)
rmse = np.sqrt(mean_squared_error(test['sales'], forecast))
mape = np.mean(np.abs((test['sales'] - forecast) / test['sales'])) * 100

print(f"\\nARIMA模型评估:")
print(f"MAE: {mae:.2f}")
print(f"RMSE: {rmse:.2f}")
print(f"MAPE: {mape:.2f}%")

# 6. 可视化预测结果
plt.figure(figsize=(14, 6))
plt.plot(train['date'], train['sales'], label='训练数据', color='#19bcc8')
plt.plot(test['date'], test['sales'], label='真实值', color='#17a8b4', marker='o')
plt.plot(test['date'], forecast, label='ARIMA预测', color='#ff6b6b', marker='s')
plt.title('ARIMA销售额预测', fontsize=16, fontweight='bold')
plt.xlabel('日期')
plt.ylabel('销售额（万元）')
plt.legend()
plt.grid(alpha=0.3)
plt.tight_layout()
plt.savefig('arima_forecast.png', dpi=300)

# 7. 预测未来3个月
future_forecast = fitted_model.forecast(steps=3)
print("\\n未来3个月预测（ARIMA）:")
for i, value in enumerate(future_forecast, 1):
    print(f"2025-{i:02d}: {value:.2f} 万元")`
        },
        {
          emoji: '🔮',
          title: '方法2：Prophet模型',
          desc: 'Facebook开源的时间序列预测工具',
          detail: '**优点**：自动处理节假日、趋势变化、异常值\\n**适用**：业务数据，有节假日效应\\n**特点**：简单易用，无需调参',
          code: `# 安装: pip install prophet
from prophet import Prophet

# 1. 准备Prophet格式数据
prophet_df = df[['date', 'sales']].copy()
prophet_df.columns = ['ds', 'y']

# 划分训练集和测试集
prophet_train = prophet_df[:train_size]
prophet_test = prophet_df[train_size:]

# 2. 训练模型
model = Prophet(
    yearly_seasonality=True,
    weekly_seasonality=False,
    daily_seasonality=False,
    seasonality_mode='multiplicative'
)

# 添加中国节假日（可选）
model.add_country_holidays(country_name='CN')

model.fit(prophet_train)

# 3. 预测
future = model.make_future_dataframe(periods=len(prophet_test), freq='MS')
forecast = model.predict(future)

# 4. 评估
prophet_pred = forecast.iloc[train_size:]['yhat'].values
mae_prophet = mean_absolute_error(prophet_test['y'], prophet_pred)
rmse_prophet = np.sqrt(mean_squared_error(prophet_test['y'], prophet_pred))
mape_prophet = np.mean(np.abs((prophet_test['y'] - prophet_pred) / prophet_test['y'])) * 100

print(f"Prophet模型评估:")
print(f"MAE: {mae_prophet:.2f}")
print(f"RMSE: {rmse_prophet:.2f}")
print(f"MAPE: {mape_prophet:.2f}%")

# 5. 可视化
fig1 = model.plot(forecast)
plt.title('Prophet销售额预测', fontsize=16, fontweight='bold')
plt.tight_layout()
plt.savefig('prophet_forecast.png', dpi=300)

# 6. 组件分解
fig2 = model.plot_components(forecast)
plt.tight_layout()
plt.savefig('prophet_components.png', dpi=300)

# 7. 预测未来3个月
future_periods = model.make_future_dataframe(periods=len(prophet_test)+3, freq='MS')
future_forecast = model.predict(future_periods)
future_3_months = future_forecast.tail(3)[['ds', 'yhat', 'yhat_lower', 'yhat_upper']]

print("\\n未来3个月预测（Prophet）:")
for idx, row in future_3_months.iterrows():
    print(f"{row['ds'].strftime('%Y-%m')}: {row['yhat']:.2f} 万元 "
          f"(区间: {row['yhat_lower']:.2f} - {row['yhat_upper']:.2f})")`
        },
        {
          emoji: '🤖',
          title: '方法3：XGBoost机器学习',
          desc: '将时间序列转换为监督学习问题',
          detail: '**优点**：可加入外部特征（促销、节假日等）\\n**适用**：有多种影响因素的业务场景\\n**特点**：高精度，可处理非线性关系',
          code: `import xgboost as xgb
from sklearn.metrics import mean_absolute_error, mean_squared_error

# 1. 特征工程
def create_features(df):
    df = df.copy()
    df['year'] = df['date'].dt.year
    df['month'] = df['date'].dt.month
    df['quarter'] = df['date'].dt.quarter
    df['dayofyear'] = df['date'].dt.dayofyear
    
    # 滞后特征（上个月、上2个月、去年同期）
    df['lag_1'] = df['sales'].shift(1)
    df['lag_2'] = df['sales'].shift(2)
    df['lag_12'] = df['sales'].shift(12)
    
    # 滚动统计特征
    df['rolling_mean_3'] = df['sales'].shift(1).rolling(window=3).mean()
    df['rolling_std_3'] = df['sales'].shift(1).rolling(window=3).std()
    df['rolling_mean_6'] = df['sales'].shift(1).rolling(window=6).mean()
    
    return df

df_features = create_features(df)
df_features = df_features.dropna()

# 2. 划分数据集
feature_cols = ['year', 'month', 'quarter', 'dayofyear', 
                'lag_1', 'lag_2', 'lag_12', 
                'rolling_mean_3', 'rolling_std_3', 'rolling_mean_6']

train_size = int(len(df_features) * 0.8)
X_train = df_features[:train_size][feature_cols]
y_train = df_features[:train_size]['sales']
X_test = df_features[train_size:][feature_cols]
y_test = df_features[train_size:]['sales']

# 3. 训练XGBoost模型
model = xgb.XGBRegressor(
    n_estimators=1000,
    learning_rate=0.01,
    max_depth=5,
    min_child_weight=1,
    subsample=0.8,
    colsample_bytree=0.8,
    random_state=42
)

model.fit(X_train, y_train, 
          eval_set=[(X_test, y_test)],
          early_stopping_rounds=50,
          verbose=False)

# 4. 预测和评估
y_pred = model.predict(X_test)

mae_xgb = mean_absolute_error(y_test, y_pred)
rmse_xgb = np.sqrt(mean_squared_error(y_test, y_pred))
mape_xgb = np.mean(np.abs((y_test - y_pred) / y_test)) * 100

print(f"XGBoost模型评估:")
print(f"MAE: {mae_xgb:.2f}")
print(f"RMSE: {rmse_xgb:.2f}")
print(f"MAPE: {mape_xgb:.2f}%")

# 5. 特征重要性
import matplotlib.pyplot as plt
xgb.plot_importance(model, max_num_features=10)
plt.title('特征重要性', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.savefig('feature_importance.png', dpi=300)

# 6. 可视化结果
plt.figure(figsize=(14, 6))
plt.plot(df_features[train_size:]['date'], y_test, 
         label='真实值', color='#19bcc8', marker='o')
plt.plot(df_features[train_size:]['date'], y_pred, 
         label='XGBoost预测', color='#ff6b6b', marker='s')
plt.title('XGBoost销售额预测', fontsize=16, fontweight='bold')
plt.xlabel('日期')
plt.ylabel('销售额（万元）')
plt.legend()
plt.grid(alpha=0.3)
plt.tight_layout()
plt.savefig('xgboost_forecast.png', dpi=300)

print("\\n✅ 三种模型对比:")
print(f"ARIMA  - MAPE: {mape:.2f}%")
print(f"Prophet - MAPE: {mape_prophet:.2f}%")
print(f"XGBoost - MAPE: {mape_xgb:.2f}%")`
        },
        {
          emoji: '📊',
          title: '模型对比与业务建议',
          desc: '综合对比三种方法，输出最终预测报告',
          detail: '**输出**：Excel报告 + 可视化Dashboard\\n**建议**：根据MAPE选择最优模型\\n**应用**：库存计划、营销预算分配',
          code: `# 1. 模型对比汇总
comparison = pd.DataFrame({
    '模型': ['ARIMA', 'Prophet', 'XGBoost'],
    'MAE': [mae, mae_prophet, mae_xgb],
    'RMSE': [rmse, rmse_prophet, rmse_xgb],
    'MAPE(%)': [mape, mape_prophet, mape_xgb],
    '优点': [
        '统计学原理，可解释性强',
        '自动处理节假日和异常值',
        '可融合多种特征，精度高'
    ],
    '缺点': [
        '需要调参，对异常值敏感',
        '需要较长历史数据',
        '黑盒模型，可解释性弱'
    ]
})

print("\\n模型综合对比:")
print(comparison.to_string(index=False))

# 2. 选择最优模型
best_model_idx = comparison['MAPE(%)'].idxmin()
best_model_name = comparison.loc[best_model_idx, '模型']
print(f"\\n🏆 最优模型: {best_model_name} (MAPE: {comparison.loc[best_model_idx, 'MAPE(%)']:.2f}%)")

# 3. 生成预测报告
with pd.ExcelWriter('销售额预测报告.xlsx', engine='openpyxl') as writer:
    # Sheet1: 模型对比
    comparison.to_excel(writer, sheet_name='模型对比', index=False)
    
    # Sheet2: 历史数据
    df.to_excel(writer, sheet_name='历史数据', index=False)
    
    # Sheet3: 未来预测（使用最优模型的结果）
    # 这里假设使用Prophet的结果
    future_3_months.to_excel(writer, sheet_name='未来预测', index=False)
    
    # Sheet4: 业务建议
    suggestions = pd.DataFrame({
        '月份': ['2025-01', '2025-02', '2025-03'],
        '预测销售额': future_3_months['yhat'].values,
        '建议库存': future_3_months['yhat'].values * 1.2,  # 预留20%缓冲
        '营销预算': future_3_months['yhat'].values * 0.15,  # 15%用于营销
        '备注': [
            '春节月，加大促销力度',
            '淡季，控制库存',
            '开始备货Q2旺季'
        ]
    })
    suggestions.to_excel(writer, sheet_name='业务建议', index=False)

print("\\n✅ 预测报告已生成: 销售额预测报告.xlsx")

# 4. 创建可视化Dashboard
import plotly.graph_objects as go
from plotly.subplots import make_subplots

fig = make_subplots(
    rows=2, cols=2,
    subplot_titles=('历史趋势与预测', '模型对比', '季节性分解', '置信区间'),
    specs=[[{"colspan": 2}, None],
           [{"type": "bar"}, {"type": "scatter"}]]
)

# 子图1: 历史趋势与预测
fig.add_trace(go.Scatter(x=df['date'], y=df['sales'], 
                         mode='lines', name='历史数据',
                         line=dict(color='#19bcc8', width=2)),
              row=1, col=1)

# 子图2: 模型对比
fig.add_trace(go.Bar(x=comparison['模型'], y=comparison['MAPE(%)'],
                     marker_color='#19bcc8', name='MAPE'),
              row=2, col=1)

fig.update_layout(height=800, showlegend=True, 
                  title_text="销售额预测分析Dashboard")
fig.write_html('sales_forecast_dashboard.html')

print("✅ Dashboard已生成: sales_forecast_dashboard.html")
print("\\n" + "="*60)
print("项目完成！可用于:")
print("  1. 库存计划优化")
print("  2. 营销预算分配")
print("  3. 供应链管理")
print("  4. 财务预算编制")
print("="*60)`
        }
      ]
    },
    {
      id: 'project-churn',
      title: 'PART 18 用户流失预警实战',
      subtitle: '机器学习分类 —— 提前识别流失用户并挽回',
      items: [
        {
          emoji: '🎯',
          title: '项目背景与数据理解',
          desc: '电信公司想提前识别可能流失的用户，进行精准挽留',
          detail: '**业务价值**：挽留一个老客户的成本 < 获取一个新客户\\n**数据**：用户属性、使用行为、消费记录\\n**目标**：预测未来1个月内流失概率',
          code: `"""
项目：用户流失预警系统
业务场景：电信行业客户流失预测
数据：7000+用户的20+个特征
目标：预测流失概率，实现精准挽留

数据字段：
- 用户属性：性别、年龄、是否老年人、是否有配偶、是否有家属
- 账户信息：合约类型、付款方式、是否无纸化账单、月费、总费用
- 服务使用：是否使用电话、多线路、网络、在线安全、在线备份、设备保护、技术支持、流媒体电视、流媒体电影
- 标签：Churn（0=未流失，1=已流失）

技术栈：
- Pandas/NumPy：数据处理
- Scikit-learn：机器学习
- XGBoost/LightGBM：集成学习
- SHAP：模型解释
- Imbalanced-learn：处理样本不平衡
"""

import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.metrics import classification_report, confusion_matrix, roc_auc_score, roc_curve
import warnings
warnings.filterwarnings('ignore')

# 1. 加载数据
df = pd.read_csv('telecom_churn.csv')

print("数据形状:", df.shape)
print("\\n数据预览:")
print(df.head())
print("\\n数据信息:")
print(df.info())

# 2. 查看流失率
churn_rate = df['Churn'].value_counts(normalize=True)
print("\\n流失率:")
print(churn_rate)
print(f"\\n流失用户比例: {churn_rate[1]*100:.2f}%")

# 3. 可视化流失分布
fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# 流失用户数量
df['Churn'].value_counts().plot(kind='bar', ax=axes[0], color=['#19bcc8', '#ff6b6b'])
axes[0].set_title('流失用户分布', fontsize=14, fontweight='bold')
axes[0].set_xticklabels(['未流失', '已流失'], rotation=0)
axes[0].set_ylabel('用户数')

# 月费与流失关系
sns.boxplot(data=df, x='Churn', y='MonthlyCharges', ax=axes[1])
axes[1].set_title('月费与流失关系', fontsize=14, fontweight='bold')
axes[1].set_xticklabels(['未流失', '已流失'])

plt.tight_layout()
plt.savefig('churn_overview.png', dpi=300)

print("\\n✅ 数据加载完成")`
        },
        {
          emoji: '🔧',
          title: '数据预处理与特征工程',
          desc: '处理缺失值、编码、特征衍生',
          detail: '**重点**：类别变量编码、特征缩放、样本不平衡处理\\n**技巧**：从业务角度衍生新特征\\n**输出**：可用于建模的特征矩阵',
          code: `# 1. 处理缺失值
print("缺失值统计:")
print(df.isnull().sum())

# TotalCharges有缺失值，转换为数值类型
df['TotalCharges'] = pd.to_numeric(df['TotalCharges'], errors='coerce')
df['TotalCharges'].fillna(df['TotalCharges'].median(), inplace=True)

# 2. 特征工程
# 2.1 在网时长（用总费用/月费估算）
df['tenure_months'] = (df['TotalCharges'] / df['MonthlyCharges']).fillna(0)

# 2.2 月均消费增长率
df['avg_monthly_growth'] = df['TotalCharges'] / (df['tenure_months'] + 1)

# 2.3 服务使用数量
service_cols = ['PhoneService', 'MultipleLines', 'InternetService', 
                'OnlineSecurity', 'OnlineBackup', 'DeviceProtection', 
                'TechSupport', 'StreamingTV', 'StreamingMovies']
df['total_services'] = (df[service_cols] != 'No').sum(axis=1)

# 2.4 是否高价值客户
df['is_high_value'] = (df['MonthlyCharges'] > df['MonthlyCharges'].median()).astype(int)

# 2.5 合约风险（月付合约风险高）
df['contract_risk'] = (df['Contract'] == 'Month-to-month').astype(int)

print("\\n新增特征:")
print(df[['tenure_months', 'avg_monthly_growth', 'total_services', 
          'is_high_value', 'contract_risk']].head())

# 3. 编码类别变量
# 3.1 二分类变量（Yes/No）
binary_cols = ['gender', 'SeniorCitizen', 'Partner', 'Dependents', 
               'PhoneService', 'PaperlessBilling']
for col in binary_cols:
    if col in df.columns:
        df[col] = df[col].map({'Yes': 1, 'No': 0, 'Male': 1, 'Female': 0})

# 3.2 多分类变量（One-Hot编码）
categorical_cols = ['MultipleLines', 'InternetService', 'OnlineSecurity', 
                   'OnlineBackup', 'DeviceProtection', 'TechSupport', 
                   'StreamingTV', 'StreamingMovies', 'Contract', 
                   'PaymentMethod']
df_encoded = pd.get_dummies(df, columns=categorical_cols, drop_first=True)

# 3.3 目标变量
df_encoded['Churn'] = df_encoded['Churn'].map({'Yes': 1, 'No': 0})

# 4. 删除不需要的列
drop_cols = ['customerID']
df_encoded = df_encoded.drop(columns=[col for col in drop_cols if col in df_encoded.columns])

print("\\n编码后特征数量:", df_encoded.shape[1])
print("特征列表:")
print(df_encoded.columns.tolist())

# 5. 划分特征和标签
X = df_encoded.drop('Churn', axis=1)
y = df_encoded['Churn']

# 6. 划分训练集和测试集
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42, stratify=y
)

print(f"\\n训练集: {X_train.shape}")
print(f"测试集: {X_test.shape}")
print(f"训练集流失率: {y_train.mean()*100:.2f}%")
print(f"测试集流失率: {y_test.mean()*100:.2f}%")

# 7. 特征缩放
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

print("\\n✅ 数据预处理完成")`
        },
        {
          emoji: '🤖',
          title: '模型训练与对比',
          desc: '逻辑回归、随机森林、XGBoost、LightGBM',
          detail: '**对比**：4种算法性能对比\\n**指标**：准确率、召回率、F1、AUC\\n**重点**：召回率（不漏掉流失用户）',
          code: `from sklearn.linear_model import LogisticRegression
from sklearn.ensemble import RandomForestClassifier
from xgboost import XGBClassifier
from lightgbm import LGBMClassifier
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score

# 处理样本不平衡
from imblearn.over_sampling import SMOTE

smote = SMOTE(random_state=42)
X_train_balanced, y_train_balanced = smote.fit_resample(X_train_scaled, y_train)

print(f"SMOTE后训练集: {X_train_balanced.shape}")
print(f"流失用户比例: {y_train_balanced.mean()*100:.2f}%")

# 定义模型
models = {
    'Logistic Regression': LogisticRegression(random_state=42, max_iter=1000),
    'Random Forest': RandomForestClassifier(n_estimators=100, random_state=42),
    'XGBoost': XGBClassifier(n_estimators=100, random_state=42, use_label_encoder=False, eval_metric='logloss'),
    'LightGBM': LGBMClassifier(n_estimators=100, random_state=42, verbose=-1)
}

# 训练和评估
results = []

for name, model in models.items():
    print(f"\\n{'='*60}")
    print(f"训练 {name}...")
    
    # 训练
    model.fit(X_train_balanced, y_train_balanced)
    
    # 预测
    y_pred = model.predict(X_test_scaled)
    y_pred_proba = model.predict_proba(X_test_scaled)[:, 1]
    
    # 评估
    accuracy = accuracy_score(y_test, y_pred)
    precision = precision_score(y_test, y_pred)
    recall = recall_score(y_test, y_pred)
    f1 = f1_score(y_test, y_pred)
    auc = roc_auc_score(y_test, y_pred_proba)
    
    results.append({
        '模型': name,
        '准确率': f'{accuracy:.4f}',
        '精确率': f'{precision:.4f}',
        '召回率': f'{recall:.4f}',
        'F1分数': f'{f1:.4f}',
        'AUC': f'{auc:.4f}'
    })
    
    print(f"准确率: {accuracy:.4f}")
    print(f"精确率: {precision:.4f}")
    print(f"召回率: {recall:.4f}")
    print(f"F1分数: {f1:.4f}")
    print(f"AUC: {auc:.4f}")

# 模型对比表
results_df = pd.DataFrame(results)
print("\\n" + "="*60)
print("模型性能对比:")
print("="*60)
print(results_df.to_string(index=False))

# 选择最优模型（这里选择AUC最高的）
best_model_name = results_df.loc[results_df['AUC'].astype(float).idxmax(), '模型']
print(f"\\n🏆 最优模型: {best_model_name}")

# 保存最优模型（假设是LightGBM）
best_model = models['LightGBM']
import joblib
joblib.dump(best_model, 'churn_model.pkl')
joblib.dump(scaler, 'scaler.pkl')
print("\\n✅ 模型已保存: churn_model.pkl")`
        },
        {
          emoji: '📊',
          title: '模型解释与业务洞察',
          desc: '使用SHAP解释模型，识别流失关键因素',
          detail: '**工具**：SHAP（SHapley Additive exPlanations）\\n**输出**：特征重要性、单个用户流失原因\\n**价值**：指导挽留策略',
          code: `import shap
import matplotlib.pyplot as plt

# 1. 计算SHAP值
explainer = shap.TreeExplainer(best_model)
shap_values = explainer.shap_values(X_test_scaled)

# 2. 特征重要性（全局）
plt.figure(figsize=(10, 8))
shap.summary_plot(shap_values, X_test, plot_type="bar", show=False)
plt.title('特征重要性排名（SHAP）', fontsize=16, fontweight='bold')
plt.tight_layout()
plt.savefig('shap_feature_importance.png', dpi=300)

# 3. SHAP Summary Plot（显示特征值影响）
plt.figure(figsize=(10, 8))
shap.summary_plot(shap_values, X_test, show=False)
plt.title('特征值对流失预测的影响', fontsize=16, fontweight='bold')
plt.tight_layout()
plt.savefig('shap_summary.png', dpi=300)

# 4. 单个用户解释（选择第一个流失用户）
churn_user_idx = y_test[y_test == 1].index[0]
churn_user_idx_in_test = list(y_test.index).index(churn_user_idx)

shap.force_plot(
    explainer.expected_value, 
    shap_values[churn_user_idx_in_test], 
    X_test.iloc[churn_user_idx_in_test],
    matplotlib=True,
    show=False
)
plt.title(f'用户 {churn_user_idx} 流失原因解释', fontsize=14, fontweight='bold')
plt.tight_layout()
plt.savefig('shap_user_explanation.png', dpi=300, bbox_inches='tight')

print("\\n✅ SHAP分析完成")

# 5. 业务洞察总结
print("\\n" + "="*60)
print("关键流失因素分析（基于SHAP）:")
print("="*60)

# 获取特征重要性排名
feature_importance = pd.DataFrame({
    'feature': X_test.columns,
    'importance': np.abs(shap_values).mean(axis=0)
}).sort_values('importance', ascending=False)

print("\\nTop 10 流失影响因素:")
print(feature_importance.head(10).to_string(index=False))

print("\\n💡 业务建议:")
print("1. 合约类型：月付用户流失风险高 → 推荐年付优惠")
print("2. 在网时长：新用户流失多 → 加强新用户关怀")
print("3. 月费：高月费用户易流失 → 提供阶梯优惠")
print("4. 技术支持：未使用者易流失 → 主动提供技术支持")
print("5. 付款方式：电子支票用户易流失 → 推荐自动扣款")`
        },
        {
          emoji: '🎯',
          title: '流失预警系统与挽留策略',
          desc: '构建实时预警系统，输出挽留名单',
          detail: '**输出**：高风险用户名单 + 个性化挽留策略\\n**应用**：客服中心、营销部门\\n**ROI**：挽留成本 < 客户生命周期价值',
          code: `# 1. 对所有用户进行流失概率预测
all_users_scaled = scaler.transform(X)
churn_proba = best_model.predict_proba(all_users_scaled)[:, 1]

# 添加流失概率到原数据
df['churn_probability'] = churn_proba
df['churn_risk_level'] = pd.cut(churn_proba, 
                                 bins=[0, 0.3, 0.6, 1.0],
                                 labels=['低风险', '中风险', '高风险'])

# 2. 高风险用户名单
high_risk_users = df[df['churn_risk_level'] == '高风险'].copy()
high_risk_users = high_risk_users.sort_values('churn_probability', ascending=False)

print(f"\\n高风险用户数量: {len(high_risk_users)}")
print(f"占比: {len(high_risk_users)/len(df)*100:.2f}%")

# 3. 挽留策略建议（基于用户特征）
def recommend_retention_strategy(row):
    strategies = []
    
    if row.get('Contract') == 'Month-to-month':
        strategies.append('📌 合约优惠：升级至年付享8折优惠')
    
    if row.get('MonthlyCharges', 0) > df['MonthlyCharges'].median():
        strategies.append('💰 价格优惠：VIP专属折扣，月费减免20%')
    
    if row.get('TechSupport') == 'No':
        strategies.append('🛠️ 技术支持：免费赠送3个月技术支持服务')
    
    if row.get('tenure_months', 0) < 12:
        strategies.append('🎁 新用户关怀：赠送话费/流量包')
    
    if row.get('PaymentMethod') == 'Electronic check':
        strategies.append('🏦 付款优惠：改用自动扣款享每月5元优惠')
    
    return ' | '.join(strategies) if strategies else '✅ 常规关怀'

high_risk_users['retention_strategy'] = high_risk_users.apply(
    recommend_retention_strategy, axis=1
)

# 4. 输出挽留名单
retention_list = high_risk_users[[
    'customerID', 'churn_probability', 'churn_risk_level',
    'MonthlyCharges', 'TotalCharges', 'Contract', 
    'tenure_months', 'retention_strategy'
]].copy()

retention_list.columns = [
    '用户ID', '流失概率', '风险等级', '月费', '总费用', 
    '合约类型', '在网月数', '挽留策略'
]

print("\\nTop 10 高风险用户:")
print(retention_list.head(10).to_string(index=False))

# 5. 导出Excel报告
with pd.ExcelWriter('用户流失预警报告.xlsx', engine='openpyxl') as writer:
    # Sheet1: 模型性能
    results_df.to_excel(writer, sheet_name='模型性能', index=False)
    
    # Sheet2: 高风险用户名单
    retention_list.to_excel(writer, sheet_name='高风险用户', index=False)
    
    # Sheet3: 特征重要性
    feature_importance.to_excel(writer, sheet_name='关键因素', index=False)
    
    # Sheet4: 风险分布
    risk_summary = df['churn_risk_level'].value_counts().reset_index()
    risk_summary.columns = ['风险等级', '用户数']
    risk_summary.to_excel(writer, sheet_name='风险分布', index=False)

print("\\n✅ 预警报告已生成: 用户流失预警报告.xlsx")

# 6. ROI计算
print("\\n" + "="*60)
print("挽留ROI分析:")
print("="*60)
avg_clv = df['TotalCharges'].mean()  # 客户生命周期价值
retention_cost = 100  # 假设挽留成本100元/人
expected_retention_rate = 0.3  # 假设挽留成功率30%

total_high_risk = len(high_risk_users)
expected_saved = total_high_risk * expected_retention_rate
total_cost = total_high_risk * retention_cost
total_value = expected_saved * avg_clv
roi = (total_value - total_cost) / total_cost * 100

print(f"高风险用户数: {total_high_risk}")
print(f"预计挽留成功: {expected_saved:.0f} 人")
print(f"挽留总成本: ¥{total_cost:,.0f}")
print(f"预计挽回价值: ¥{total_value:,.0f}")
print(f"ROI: {roi:.2f}%")
print("="*60)

print("\\n✅ 项目完成！可用于:")
print("  1. 客服中心主动外呼挽留")
print("  2. 精准营销活动推送")
print("  3. 产品优化和服务改进")
print("  4. 客户生命周期管理")`
        }
      ]
    },
    {
      id: 'learning-path',
      title: 'PART 19 学习路径',
      subtitle: '从入门到精通的完整路线图',
      items: [
        {
          emoji: '🗺️',
          title: 'Python数据分析学习路径',
          desc: '30天从零到数据分析师',
          detail: '**典型业务场景**：系统化学习规划\\n**易踩坑点**：贪多嚼不烂、没有实战\\n**可继续深挖**：Kaggle实战、项目实践',
          code: `# 第1周：Python基础（每天2小时）
# Day 1-2: Python环境、基础语法、数据结构
# Day 3-4: 函数、循环、文件操作
# Day 5-7: 综合练习、小项目

# 第2周：NumPy & Pandas（每天2小时）
# Day 8-9: NumPy数组、向量化运算
# Day 10-12: Pandas读取、筛选、清洗
# Day 13-14: GroupBy、Merge、时间序列

# 第3周：数据可视化（每天2小时）
# Day 15-16: Matplotlib基础图表
# Day 17-18: Seaborn高级可视化
# Day 19-21: 实战项目：销售数据分析看板

# 第4周：综合实战（每天3小时）
# Day 22-23: 完整数据分析项目
# Day 24-25: 自动化报表脚本
# Day 26-27: SQL集成、数据库操作
# Day 28-30: 个人项目、简历项目

# 推荐学习资源
# 1. 官方文档：pandas.pydata.org
# 2. 视频教程：B站、YouTube
# 3. 实战平台：Kaggle、天池
# 4. 书籍：《利用Python进行数据分析》

# 进阶方向
# 1. 数据可视化：Plotly、Dash
# 2. 机器学习：Scikit-learn
# 3. 大数据：PySpark、Dask
# 4. 自动化：Airflow、Luigi`
        }
      ]
    }
  ]

  return (
    <div className={isDark ? 'bg-gray-900 min-h-screen' : 'bg-gray-50 min-h-screen'}>
      <style jsx global>{`
        .python-code-block {
          background-color: #2b2b2b !important;
        }
        .python-code-block code {
          color: #a9b7c6 !important;
          background-color: transparent !important;
        }
      `}</style>
      <Navigation />

      {/* 面包屑导航 */}
      <div className={isDark ? 'bg-gray-800 border-gray-700 border-b sticky top-0 z-10' : 'bg-white border-gray-200 border-b sticky top-0 z-10'}>
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2 h-16">
            <Link href="/" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 transition-colors">
                <Home size={20} />
                <span className="font-medium">主页</span>
              </Link>
            <span className={isDark ? 'text-gray-600' : 'text-gray-400'}>/</span>
            <span className={isDark ? 'text-gray-100 font-medium' : 'text-gray-900 font-medium'}>Python数据分析</span>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className={isDark ? 'sticky top-24 bg-gray-800/95 border-gray-700 backdrop-blur-sm rounded-2xl border-2 p-5 shadow-lg max-h-[calc(100vh-120px)] overflow-y-auto' : 'sticky top-24 bg-white/95 border-gray-200 backdrop-blur-sm rounded-2xl border-2 p-5 shadow-lg max-h-[calc(100vh-120px)] overflow-y-auto'}>
              <h3 className="text-xl font-extrabold mb-6 flex items-center gap-2">
                {getLucideIcon('📖', 'w-6 h-6 text-[#19bcc8]')}
                <span className={isDark ? 'text-gray-100' : 'text-gray-800'}>目录导航</span>
              </h3>
              <nav className="space-y-1.5">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id
                  
                  return (
                    <a
                      key={item.id}
                      href={'#' + item.id}
                      className={
                        'flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-200 border-2 ' +
                        (isActive
                          ? 'border-[#19bcc8] bg-[#19bcc8]/10 shadow-md'
                          : (isDark ? 'border-transparent hover:bg-gray-700/50 hover:border-[#19bcc8]/30' : 'border-transparent hover:bg-[#19bcc8]/5 hover:border-[#19bcc8]/30')
                        )
                      }
                    >
                      {getLucideIcon(item.icon, 'w-5 h-5 text-[#19bcc8]')}
                      <span className={'text-sm font-medium ' + (isActive ? 'text-[#19bcc8]' : (isDark ? 'text-gray-200' : 'text-gray-700'))}>
                        {item.label}
                      </span>
                    </a>
                  )
                })}
              </nav>
            </div>
          </aside>

          <main className="flex-1 min-w-0">
            {/* 页面标题 */}
            <div className="text-center mb-20">
              <div className="flex items-center justify-center mb-6">
                <div className="p-3 rounded-full bg-gradient-to-r from-green-500 to-teal-600">
                  {getLucideIcon('🐍', 'h-8 w-8 text-white')}
                </div>
              </div>
              <h1 className={'text-4xl font-bold mb-6 ' + (isDark ? 'text-gray-100' : 'text-gray-900')}>
                Python 数据分析完整知识体系
              </h1>
              <p className={'text-lg max-w-3xl mx-auto ' + (isDark ? 'text-gray-400' : 'text-gray-600')}>
                从环境搭建到高级应用，从理论框架到实战落地，掌握数据分析师必备的业务知识
              </p>
            </div>

            <section id="intro" className="mb-16 scroll-mt-24">
              <div className={'rounded-xl p-10 shadow-sm border ' + (isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200')}>
                <h2 className={'text-3xl font-bold mb-8 ' + (isDark ? 'text-gray-100' : 'text-gray-900')}>
                  {getLucideIcon('📊', 'inline w-6 h-6 text-[#19bcc8]')} 知识体系架构
                </h2>

                <div className="mt-8 grid grid-cols-3 gap-4">
                  {[
                    { label: '140+ Python代码', value: '实战代码' },
                    { label: '1500+ 行代码', value: '深度讲解' },
                    { label: '90% 场景覆盖', value: '数据分析' }
                  ].map((item, idx) => (
                    <div key={idx} className={'rounded-lg p-4 border ' + (isDark ? 'bg-[#19bcc8]/10 border-[#19bcc8]/30' : 'bg-[#19bcc8]/5 border-[#19bcc8]/20')}>
                      <div className={'text-sm mb-1 ' + (isDark ? 'text-gray-400' : 'text-gray-600')}>{item.label}</div>
                      <div className={'text-lg font-bold ' + (isDark ? 'text-gray-100' : 'text-[#19bcc8]')}>{item.value}</div>
                  </div>
                ))}
            </div>
          </div>

              {/* 体系特点 */}
              <div className={'mt-12 rounded-xl p-6 shadow-sm border ' + (isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200')}>
                <h3 className={'text-xl font-bold mb-6 flex items-center gap-2 ' + (isDark ? 'text-gray-100' : 'text-gray-900')}>
                  {getLucideIcon('⭐', 'w-6 h-6 text-[#19bcc8]')}
                  <span>本体系特点</span>
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { icon: '🎯', title: '聚焦数据分析', desc: '只讲数据分析必备，跳过Web开发、爬虫等无关内容' },
                    { icon: '📊', title: '四大核心库', desc: 'NumPy、Pandas、Matplotlib、Seaborn深度讲解' },
                    { icon: '💼', title: '业务导向', desc: '所有案例来自真实业务场景（销售、用户、运营）' },
                    { icon: '🔧', title: '即学即用', desc: '每个知识点配代码模板，复制即可上手' }
                  ].map((item, idx) => (
                    <div key={idx} className={'p-4 rounded-lg border transition-all duration-300 ' + (isDark ? 'bg-gray-700/30 border-gray-600 hover:border-[#19bcc8]' : 'bg-gray-50 border-gray-200 hover:border-[#19bcc8]')}>
                      <div className="flex items-start gap-3">
                        {getLucideIcon(item.icon, 'w-6 h-6 text-[#19bcc8] flex-shrink-0')}
                        <div>
                          <h4 className={'font-bold mb-1 ' + (isDark ? 'text-gray-100' : 'text-gray-900')}>{item.title}</h4>
                          <p className={'text-sm ' + (isDark ? 'text-gray-400' : 'text-gray-600')}>{item.desc}</p>
                        </div>
                      </div>
                    </div>
                    ))}
                  </div>
                </div>
            </section>

            {/* PART内容 */}
            <div className="space-y-24">
              {parts.map((part, partIdx) => (
                <section key={part.id} id={part.id} className="scroll-mt-24">
                  <div className={'rounded-xl p-6 shadow-sm border mb-10 ' + (isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200')}>
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-1 h-12 bg-[#19bcc8] rounded-full"></div>
                      <h2 className={'text-3xl font-extrabold ' + (isDark ? 'text-gray-100' : 'text-gray-900')}>{part.title}</h2>
                    </div>
                    <p className={'text-base ml-5 ' + (isDark ? 'text-gray-400' : 'text-gray-600')}>{part.subtitle}</p>
                  </div>

                  <div className="space-y-6">
                    {part.items.map((item, itemIdx) => (
                      <div key={itemIdx} className={'rounded-xl border p-5 transition-all duration-300 shadow-sm hover:shadow-md ' + (isDark ? 'bg-gray-800 border-gray-700 hover:border-[#19bcc8]' : 'bg-white border-gray-200 hover:border-[#19bcc8]')}>
                        <div className="flex items-start gap-4">
                          {getLucideIcon(item.emoji, 'w-6 h-6 text-[#19bcc8] flex-shrink-0 mt-1')}
                          <div className="flex-1 min-w-0">
                            <h3 className={'text-lg font-bold mb-2 flex items-center gap-2 ' + (isDark ? 'text-gray-100' : 'text-gray-900')}>
                              {item.title}
                            </h3>
                            <p className={'mb-3 text-sm ' + (isDark ? 'text-gray-300' : 'text-gray-700')}>
                              {item.desc}
                            </p>
                            {item.detail && (
                              <div className={'p-4 rounded-lg border-l-2 border-[#19bcc8] mb-4 ' + (isDark ? 'bg-gray-900/50' : 'bg-gray-50')}>
                                {item.detail.split('\\n').map((part, i) => (
                                  <p key={i} className={'text-sm mb-2 last:mb-0 ' + (isDark ? 'text-gray-400' : 'text-gray-600')}>
                                    {part.startsWith('**') ? (
                                      <>
                                        <span className="font-bold text-[#19bcc8]">{part.split('**')[1]}</span>
                                        {part.split('**')[2]}
                                      </>
                                    ) : (
                                      part
                                    )}
                                  </p>
              ))}
            </div>
                            )}
                            {item.code && (
                              <pre 
                                className="p-4 rounded-lg border overflow-x-auto font-mono text-sm"
                                style={{
                                  backgroundColor: '#e8f5f3',
                                  borderColor: '#19bcc8',
                                  color: '#000'
                                }}
                              >
                                <code>
                                  {item.code.split('\n').map((line, idx, arr) => {
                                    const isComment = line.trim().startsWith('#');
                                    const prevLine = idx > 0 ? arr[idx - 1].trim() : '';
                                    // 如果当前行是注释，且前一行不是空行也不是注释，则添加空行
                                    const needsSpace = isComment && prevLine.length > 0 && !prevLine.startsWith('#');
                                    
                                    return (
                                      <div key={idx}>
                                        {needsSpace && <div>&nbsp;</div>}
                                        <div style={{ color: isComment ? '#888' : '#000' }}>
                                          {line || '\u00A0'}
          </div>
        </div>
                                    );
                                  })}
                                </code>
                              </pre>
                            )}
      </div>
    </div>
      </div>
                    ))}
    </div>

                  {/* 分隔线 */}
                  {partIdx < parts.length - 1 && (
                    <div className="flex items-center justify-center my-16">
                      <div className={'w-2 h-2 rounded-full mx-2 ' + (isDark ? 'bg-[#19bcc8]' : 'bg-[#19bcc8]')}></div>
                      <div className={'w-2 h-2 rounded-full mx-2 ' + (isDark ? 'bg-[#19bcc8]' : 'bg-[#19bcc8]')}></div>
                      <div className={'w-2 h-2 rounded-full mx-2 ' + (isDark ? 'bg-[#19bcc8]' : 'bg-[#19bcc8]')}></div>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* 页脚总结 */}
            <div className={'rounded-xl p-8 mt-20 shadow-sm border ' + (isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200')}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-1 h-8 bg-[#19bcc8] rounded-full"></div>
                <h3 className={'text-2xl font-bold ' + (isDark ? 'text-gray-100' : 'text-gray-900')}>
                  恭喜！你已掌握Python数据分析完整知识体系
                </h3>
              </div>
              <p className={'mb-6 ml-4 ' + (isDark ? 'text-gray-300' : 'text-gray-700')}>
                从环境搭建到高级应用，14个模块循序渐进，140+代码模板助你快速上手数据分析工作。
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className={'p-4 rounded-lg border ' + (isDark ? 'bg-gray-700/30 border-gray-600' : 'bg-gray-50 border-gray-200')}>
                  <div className={'text-3xl font-black mb-2 text-[#19bcc8]'}>14</div>
                  <div className={'text-sm ' + (isDark ? 'text-gray-400' : 'text-gray-600')}>核心模块</div>
                </div>
                <div className={'p-4 rounded-lg border ' + (isDark ? 'bg-gray-700/30 border-gray-600' : 'bg-gray-50 border-gray-200')}>
                  <div className={'text-3xl font-black mb-2 text-[#19bcc8]'}>140+</div>
                  <div className={'text-sm ' + (isDark ? 'text-gray-400' : 'text-gray-600')}>代码示例</div>
                </div>
                <div className={'p-4 rounded-lg border ' + (isDark ? 'bg-gray-700/30 border-gray-600' : 'bg-gray-50 border-gray-200')}>
                  <div className={'text-3xl font-black mb-2 text-[#19bcc8]'}>90%</div>
                  <div className={'text-sm ' + (isDark ? 'text-gray-400' : 'text-gray-600')}>场景覆盖</div>
                </div>
              </div>
            </div>
          </main>
        </div>

        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className={
              'fixed bottom-8 right-8 p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 z-50 bg-[#19bcc8] hover:bg-[#17a8b4] text-white'
            }
            aria-label="返回顶部"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* 代码块样式 - 简单区分注释 */}
      <style jsx global>{`
        pre code {
          display: block;
          white-space: pre;
          line-height: 1.6;
        }
        
        /* 注释行用灰色 */
        pre code::before {
          content: '';
        }
      `}</style>
    </div>
  )
}
