'use client'

import React from 'react'
import { getLucideIcon } from "@/components/LucideIcon";
import { Card, CardContent } from '@/components/ui/card'

interface AdvancedModulesProps {
  theme: 'light' | 'dark'
}

// 样本不均衡处理模块
export const ImbalancedDataModule: React.FC<AdvancedModulesProps> = ({ theme }) => {
  return (
    <>
      <div className="relative flex items-center justify-center py-4">
        <div className={`absolute inset-0 flex items-center ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
        </div>
        <div className="relative px-4 text-amber-500 font-bold">◆ ◆ ◆</div>
      </div>

      <section id="imbalanced-data">
        <div className="relative overflow-hidden rounded-xl p-6 mb-6 bg-gradient-to-r from-amber-500 via-yellow-500 to-orange-500 shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-white rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">⚖️ 08. 样本不均衡处理</h2>
            </div>
            <p className="text-amber-50 ml-7">解决实战中最常见的数据问题</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardContent className="pt-6 space-y-6">
              {/* 问题识别 */}
              <div>
                <div className={`relative mb-4 pb-3 border-b-2 ${theme === 'dark' ? 'border-amber-500/30' : 'border-amber-200'}`}>
                  <h3 className={`text-xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-amber-400 to-yellow-400' : 'from-amber-600 to-yellow-600'} bg-clip-text text-transparent flex items-center gap-2`}>
                    <span className="text-2xl">🔍</span>
                    <span>问题识别</span>
                  </h3>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-amber-900/20 border border-amber-700' : 'bg-amber-50 border border-amber-200'}`}>
                  <p className={`text-sm mb-2 ${theme === 'dark' ? 'text-amber-300' : 'text-amber-700'}`}>
                    <strong>典型场景：</strong>用户流失预测（流失用户5%），欺诈检测（欺诈订单1%），信用违约（违约率3%）
                  </p>
                  <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>
                    ⚠ {getLucideIcon('️', 'inline w-6 h-6 text-[#19bcc8]')} 直接训练会导致模型偏向多数类，少数类（流失/欺诈）识别率低
                  </p>
                </div>
              </div>

              {/* 5大解决方案 */}
              <div>
                <div className={`relative mb-4 pb-3 border-b-2 ${theme === 'dark' ? 'border-yellow-500/30' : 'border-yellow-200'}`}>
                  <h3 className={`text-xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-yellow-400 to-orange-400' : 'from-yellow-600 to-orange-600'} bg-clip-text text-transparent flex items-center gap-2`}>
                    <span className="text-2xl">🎯</span>
                    <span>5大解决方案对比</span>
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={`border-b-2 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                        <th className={`text-left py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>方法</th>
                        <th className={`text-left py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>原理</th>
                        <th className={`text-left py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>优点</th>
                        <th className={`text-left py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>缺点</th>
                        <th className={`text-left py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>推荐度</th>
                      </tr>
                    </thead>
                    <tbody className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                      <tr className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                        <td className="py-2 px-3 font-semibold">欠采样</td>
                        <td className="py-2 px-3">删除多数类样本</td>
                        <td className="py-2 px-3">快速简单</td>
                        <td className="py-2 px-3">丢失信息</td>
                        <td className="py-2 px-3">⭐⭐</td>
                      </tr>
                      <tr className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                        <td className="py-2 px-3 font-semibold text-amber-500">SMOTE过采样</td>
                        <td className="py-2 px-3">生成合成少数类样本</td>
                        <td className="py-2 px-3">不丢失信息，效果好</td>
                        <td className="py-2 px-3">可能过拟合</td>
                        <td className="py-2 px-3">⭐⭐⭐⭐⭐</td>
                      </tr>
                      <tr className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                        <td className="py-2 px-3 font-semibold">类权重调整</td>
                        <td className="py-2 px-3">给少数类更高权重</td>
                        <td className="py-2 px-3">无需改变数据</td>
                        <td className="py-2 px-3">需要调参</td>
                        <td className="py-2 px-3">⭐⭐⭐⭐</td>
                      </tr>
                      <tr className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                        <td className="py-2 px-3 font-semibold">集成方法</td>
                        <td className="py-2 px-3">多个模型投票</td>
                        <td className="py-2 px-3">稳定性好</td>
                        <td className="py-2 px-3">计算量大</td>
                        <td className="py-2 px-3">⭐⭐⭐⭐</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold">异常检测</td>
                        <td className="py-2 px-3">将少数类视为异常</td>
                        <td className="py-2 px-3">适合极端不平衡</td>
                        <td className="py-2 px-3">概念转换</td>
                        <td className="py-2 px-3">⭐⭐⭐</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SMOTE实战代码 */}
              <div>
                <div className={`relative mb-4 pb-3 border-b-2 ${theme === 'dark' ? 'border-green-500/30' : 'border-green-200'}`}>
                  <h3 className={`text-xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-green-400 to-emerald-400' : 'from-green-600 to-emerald-600'} bg-clip-text text-transparent flex items-center gap-2`}>
                    <span className="text-2xl">💻</span>
                    <span>SMOTE过采样实战 ⭐⭐⭐⭐⭐</span>
                  </h3>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                  <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
{`from imblearn.over_sampling import SMOTE
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from collections import Counter

# 1. 查看原始数据分布
print("原始分布:", Counter(y))
# 输出: {0: 9500, 1: 500}  # 严重不平衡

# 2. 应用SMOTE
smote = SMOTE(random_state=42, k_neighbors=5)
X_resampled, y_resampled = smote.fit_resample(X, y)

print("SMOTE后分布:", Counter(y_resampled))
# 输出: {0: 9500, 1: 9500}  # 完全平衡

# 3. 训练模型
X_train, X_test, y_train, y_test = train_test_split(
    X_resampled, y_resampled, test_size=0.2, random_state=42
)

model = RandomForestClassifier()
model.fit(X_train, y_train)

# 4. 评估（重点关注少数类）
from sklearn.metrics import classification_report
print(classification_report(y_test, model.predict(X_test)))`}
                  </pre>
                </div>
              </div>

              {/* 类权重调整 */}
              <div>
                <div className={`relative mb-4 pb-3 border-b-2 ${theme === 'dark' ? 'border-blue-500/30' : 'border-blue-200'}`}>
                  <h3 className={`text-xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-blue-400 to-cyan-400' : 'from-blue-600 to-cyan-600'} bg-clip-text text-transparent flex items-center gap-2`}>
                    <span className="text-2xl">⚖️</span>
                    <span>类权重调整 ⭐⭐⭐⭐</span>
                  </h3>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                  <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
{`from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LogisticRegression

# 方法1：自动平衡权重
model = RandomForestClassifier(class_weight='balanced')
model.fit(X_train, y_train)

# 方法2：手动指定权重
model = LogisticRegression(class_weight={0: 1, 1: 10})  # 少数类权重x10
model.fit(X_train, y_train)

# 方法3：XGBoost的scale_pos_weight
import xgboost as xgb
scale = len(y[y==0]) / len(y[y==1])  # 计算比例
model = xgb.XGBClassifier(scale_pos_weight=scale)
model.fit(X_train, y_train)`}
                  </pre>
                </div>
              </div>

              {/* 不平衡评估指标 */}
              <div>
                <div className={`relative mb-4 pb-3 border-b-2 ${theme === 'dark' ? 'border-purple-500/30' : 'border-purple-200'}`}>
                  <h3 className={`text-xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-purple-400 to-pink-400' : 'from-purple-600 to-pink-600'} bg-clip-text text-transparent flex items-center gap-2`}>
                    <span className="text-2xl">📊</span>
                    <span>评估指标选择</span>
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900/20 border border-red-700' : 'bg-red-50 border border-red-200'}`}>
                    <p className={`font-bold mb-2 ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}>❌ 不推荐使用</p>
                    <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <li>• <strong>Accuracy</strong>: 不平衡数据下会误导（99%准确率可能没用）</li>
                      <li>• <strong>简单分类</strong>: 全预测为多数类也能高准确率</li>
                    </ul>
                  </div>
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-200'}`}>
                    <p className={`font-bold mb-2 ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}> {getLucideIcon('✅', 'inline w-6 h-6 text-[#19bcc8]')} 推荐使用</p>
                    <ul className={`text-xs space-y-1 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      <li>• <strong>Precision</strong>: 预测为少数类的准确性</li>
                      <li>• <strong>Recall</strong>: 找出多少少数类样本</li>
                      <li>• <strong>F1-Score</strong>: Precision和Recall的调和平均</li>
                      <li>• <strong>AUC-ROC</strong>: 综合评估分类能力</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* 实战案例 */}
              <div>
                <div className={`relative mb-4 pb-3 border-b-2 ${theme === 'dark' ? 'border-orange-500/30' : 'border-orange-200'}`}>
                  <h3 className={`text-xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-orange-400 to-red-400' : 'from-orange-600 to-red-600'} bg-clip-text text-transparent flex items-center gap-2`}>
                    <span className="text-2xl">📈</span>
                    <span>实战案例：用户流失预测</span>
                  </h3>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                  <div className={`mb-3 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <p><strong>背景：</strong>某电商平台，10万用户中流失用户5000人（5%），需要预测哪些用户会流失</p>
                  </div>
                  <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
{`# 完整流程
from imblearn.over_sampling import SMOTE
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, roc_auc_score

# 1. SMOTE处理
smote = SMOTE(random_state=42)
X_train_res, y_train_res = smote.fit_resample(X_train, y_train)

# 2. 训练模型（同时使用类权重）
model = RandomForestClassifier(
    n_estimators=100,
    class_weight='balanced',  # 双保险
    random_state=42
)
model.fit(X_train_res, y_train_res)

# 3. 评估
y_pred = model.predict(X_test)
y_proba = model.predict_proba(X_test)[:, 1]

print("分类报告:")
print(classification_report(y_test, y_pred, target_names=['留存', '流失']))
print("\\nAUC:", roc_auc_score(y_test, y_proba))

# 4. 业务应用：找出高风险用户
high_risk = X_test[y_proba > 0.7]
print(f"\\n预测高流失风险用户数: {len(high_risk)}")
# 对这些用户进行挽留营销`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}

// 模型解释性模块
export const ModelInterpretabilityModule: React.FC<AdvancedModulesProps> = ({ theme }) => {
  return (
    <>
      <div className="relative flex items-center justify-center py-4">
        <div className={`absolute inset-0 flex items-center ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-indigo-500 to-transparent"></div>
        </div>
        <div className="relative px-4 text-indigo-500 font-bold">◆ ◆ ◆</div>
      </div>

      <section id="model-interpretability">
        <div className="relative overflow-hidden rounded-xl p-6 mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-white rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">🔍 09. 模型解释性（SHAP/LIME）</h2>
            </div>
            <p className="text-indigo-50 ml-7">让黑盒模型变得可解释</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardContent className="pt-6 space-y-6">
              {/* 为什么需要模型解释性 */}
              <div>
                <div className={`relative mb-4 pb-3 border-b-2 ${theme === 'dark' ? 'border-indigo-500/30' : 'border-indigo-200'}`}>
                  <h3 className={`text-xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-indigo-400 to-purple-400' : 'from-indigo-600 to-purple-600'} bg-clip-text text-transparent flex items-center gap-2`}>
                    <span className="text-2xl">❓</span>
                    <span>为什么需要解释？</span>
                  </h3>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-indigo-900/20 border border-indigo-700' : 'bg-indigo-50 border border-indigo-200'}`}>
                    <div className="text-3xl mb-2">🏢</div>
                    <p className={`font-bold mb-1 ${theme === 'dark' ? 'text-indigo-300' : 'text-indigo-700'}`}>业务必问</p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>哪些因素影响了预测结果？</p>
                  </div>
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-purple-900/20 border border-purple-700' : 'bg-purple-50 border border-purple-200'}`}>
                    <div className="text-3xl mb-2">🔍</div>
                    <p className={`font-bold mb-1 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>模型调试</p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>发现模型BUG和异常</p>
                  </div>
                  <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-pink-900/20 border border-pink-700' : 'bg-pink-50 border border-pink-200'}`}>
                    <div className="text-3xl mb-2">{getLucideIcon('✅', 'w-5 h-5 text-[#19bcc8]')}</div>
                    <p className={`font-bold mb-1 ${theme === 'dark' ? 'text-pink-300' : 'text-pink-700'}`}>建立信任</p>
                    <p className={`text-xs ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}`}>让业务方相信模型</p>
                  </div>
                </div>
              </div>

              {/* 4大解释方法对比 */}
              <div>
                <div className={`relative mb-4 pb-3 border-b-2 ${theme === 'dark' ? 'border-purple-500/30' : 'border-purple-200'}`}>
                  <h3 className={`text-xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-purple-400 to-pink-400' : 'from-purple-600 to-pink-600'} bg-clip-text text-transparent flex items-center gap-2`}>
                    <span className="text-2xl">🎯</span>
                    <span>4大解释方法对比</span>
                  </h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className={`border-b-2 ${theme === 'dark' ? 'border-gray-600' : 'border-gray-300'}`}>
                        <th className={`text-left py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>方法</th>
                        <th className={`text-left py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>原理</th>
                        <th className={`text-left py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>优点</th>
                        <th className={`text-left py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>适用模型</th>
                        <th className={`text-left py-2 px-3 ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>推荐度</th>
                      </tr>
                    </thead>
                    <tbody className={theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}>
                      <tr className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                        <td className="py-2 px-3 font-semibold">特征重要性</td>
                        <td className="py-2 px-3">树模型内置</td>
                        <td className="py-2 px-3">快速简单</td>
                        <td className="py-2 px-3">树模型</td>
                        <td className="py-2 px-3">⭐⭐⭐</td>
                      </tr>
                      <tr className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                        <td className="py-2 px-3 font-semibold text-indigo-500">SHAP</td>
                        <td className="py-2 px-3">博弈论Shapley值</td>
                        <td className="py-2 px-3">理论严谨，可视化强</td>
                        <td className="py-2 px-3">所有模型</td>
                        <td className="py-2 px-3">⭐⭐⭐⭐⭐</td>
                      </tr>
                      <tr className={`border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
                        <td className="py-2 px-3 font-semibold">LIME</td>
                        <td className="py-2 px-3">局部线性近似</td>
                        <td className="py-2 px-3">易理解</td>
                        <td className="py-2 px-3">所有模型</td>
                        <td className="py-2 px-3">⭐⭐⭐⭐</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold">PDP部分依赖图</td>
                        <td className="py-2 px-3">特征与预测的关系</td>
                        <td className="py-2 px-3">展示趋势</td>
                        <td className="py-2 px-3">所有模型</td>
                        <td className="py-2 px-3">⭐⭐⭐⭐</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* SHAP实战 */}
              <div>
                <div className={`relative mb-4 pb-3 border-b-2 ${theme === 'dark' ? 'border-green-500/30' : 'border-green-200'}`}>
                  <h3 className={`text-xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-green-400 to-emerald-400' : 'from-green-600 to-emerald-600'} bg-clip-text text-transparent flex items-center gap-2`}>
                    <span className="text-2xl">💻</span>
                    <span>SHAP值详解 ⭐⭐⭐⭐⭐</span>
                  </h3>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                  <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
{`import shap
import xgboost as xgb
import matplotlib.pyplot as plt

# 1. 训练模型
model = xgb.XGBClassifier()
model.fit(X_train, y_train)

# 2. 创建SHAP解释器
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)

# 3. 全局解释：哪些特征最重要？
shap.summary_plot(shap_values, X_test)
# 输出：条形图展示特征重要性排序

# 4. 全局解释：特征如何影响预测？
shap.summary_plot(shap_values, X_test, plot_type="violin")
# 输出：小提琴图展示特征值分布和SHAP值的关系

# 5. 局部解释：单个预测的解释
idx = 0  # 选择第一个样本
shap.force_plot(
    explainer.expected_value, 
    shap_values[idx], 
    X_test.iloc[idx],
    matplotlib=True
)
# 输出：瀑布图展示每个特征对这个预测的贡献

# 6. 依赖图：单个特征的影响
shap.dependence_plot("age", shap_values, X_test)
# 输出：散点图展示年龄特征如何影响预测

# 7. 决策图：预测路径
shap.decision_plot(
    explainer.expected_value, 
    shap_values[:100], 
    X_test.iloc[:100]
)

# 8. 瀑布图：详细分解
shap.waterfall_plot(shap.Explanation(
    values=shap_values[idx],
    base_values=explainer.expected_value,
    data=X_test.iloc[idx],
    feature_names=X_test.columns.tolist()
))`}
                  </pre>
                </div>
              </div>

              {/* LIME实战 */}
              <div>
                <div className={`relative mb-4 pb-3 border-b-2 ${theme === 'dark' ? 'border-blue-500/30' : 'border-blue-200'}`}>
                  <h3 className={`text-xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-blue-400 to-cyan-400' : 'from-blue-600 to-cyan-600'} bg-clip-text text-transparent flex items-center gap-2`}>
                    <span className="text-2xl">🧪</span>
                    <span>LIME实战 ⭐⭐⭐⭐</span>
                  </h3>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                  <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
{`from lime import lime_tabular

# 1. 创建LIME解释器
explainer = lime_tabular.LimeTabularExplainer(
    X_train.values,
    feature_names=X_train.columns.tolist(),
    class_names=['不流失', '流失'],
    mode='classification'
)

# 2. 解释单个预测
idx = 0
explanation = explainer.explain_instance(
    X_test.iloc[idx].values,
    model.predict_proba,
    num_features=10
)

# 3. 可视化
explanation.show_in_notebook()
# 或保存为HTML
explanation.save_to_file('lime_explanation.html')

# 4. 获取文本解释
print(explanation.as_list())
# 输出：[('age > 50', 0.23), ('income < 30000', -0.15), ...]
# 正值表示增加流失概率，负值表示减少流失概率`}
                  </pre>
                </div>
              </div>

              {/* 实战案例 */}
              <div>
                <div className={`relative mb-4 pb-3 border-b-2 ${theme === 'dark' ? 'border-orange-500/30' : 'border-orange-200'}`}>
                  <h3 className={`text-xl font-bold bg-gradient-to-r ${theme === 'dark' ? 'from-orange-400 to-red-400' : 'from-orange-600 to-red-600'} bg-clip-text text-transparent flex items-center gap-2`}>
                    <span className="text-2xl">📈</span>
                    <span>实战案例：用户流失原因分析</span>
                  </h3>
                </div>
                <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                  <div className={`mb-3 text-sm ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                    <p><strong>背景：</strong>某会员制APP，需要理解为什么某些用户会流失，向业务方解释模型预测</p>
                  </div>
                  <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
{`import shap
import xgboost as xgb

# 1. 训练模型
model = xgb.XGBClassifier()
model.fit(X_train, y_train)

# 2. SHAP解释
explainer = shap.TreeExplainer(model)
shap_values = explainer.shap_values(X_test)

# 3. 全局特征重要性（业务报告用）
shap.summary_plot(shap_values, X_test, plot_type="bar")
# 发现：使用频率、会员时长、投诉次数是TOP3因素

# 4. 详细分析：使用频率如何影响流失？
shap.dependence_plot("使用频率", shap_values, X_test)
# 发现：使用频率<5次/月，流失概率显著增加

# 5. 个案分析：为什么用户A会流失？
user_a_idx = 100
shap.force_plot(
    explainer.expected_value, 
    shap_values[user_a_idx], 
    X_test.iloc[user_a_idx],
    matplotlib=True
)
# 发现：用户A的流失主要因为：
#   +0.4: 使用频率低（2次/月）
#   +0.2: 投诉次数多（5次）
#   -0.1: 会员时长长（3年，降低流失风险）
# 最终预测：流失概率85%

# 6. 业务应用：针对性挽留策略
# - 使用频率低 → 推送个性化内容，提高活跃
# - 投诉多 → 客服跟进，解决问题
# - 老会员 → 发放专属优惠，增强忠诚度`}
                  </pre>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}

// 时间序列预测模块
export const TimeSeriesModule: React.FC<AdvancedModulesProps> = ({ theme }) => {
  return (
    <>
      <div className="relative flex items-center justify-center py-4">
        <div className={`absolute inset-0 flex items-center ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
        </div>
        <div className="relative px-4 text-blue-500 font-bold">◆ ◆ ◆</div>
      </div>

      <section id="time-series">
        <div className="relative overflow-hidden rounded-xl p-6 mb-6 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500 shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-white rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">📅 10. 时间序列预测</h2>
            </div>
            <p className="text-blue-50 ml-7">销售预测、用户增长预测必备</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardContent className="pt-6 space-y-6">
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} Prophet ⭐⭐⭐⭐⭐</h4>
                <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
{`# pip install prophet
from prophet import Prophet
import pandas as pd

# 准备数据
df = pd.DataFrame({'ds': dates, 'y': values})

# 训练Prophet
model = Prophet()
model.fit(df)

# 预测未来30天
future = model.make_future_dataframe(periods=30)
forecast = model.predict(future)

# 可视化
model.plot(forecast)
model.plot_components(forecast)`}
                </pre>
              </div>

              {/* ARIMA/SARIMA 示例 */}
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-blue-900/20 border border-blue-700' : 'bg-blue-50 border border-blue-200'}`}>
                <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-blue-300' : 'text-blue-700'}`}>📉 ARIMA / SARIMA ⭐⭐⭐⭐</h4>
                <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-blue-200'}`}>
{`# pip install pmdarima
from pmdarima import auto_arima
import pandas as pd

# 1. 自动选择(p,d,q)(P,D,Q)m
model = auto_arima(
    y=train_series,
    seasonal=True,
    m=7,                # 周期（业务决定：7=周，12=月）
    stepwise=True,
    suppress_warnings=True
)

# 2. 拟合与预测
model.fit(train_series)
forecast = model.predict(n_periods=30)

# 3. 评价
from sklearn.metrics import mean_absolute_error
print('MAE:', mean_absolute_error(test_series[:30], forecast))`}
                </pre>
              </div>

              {/* 分解图表（趋势/季节/残差） */}
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-cyan-300' : 'text-cyan-700'}`}>🔎 时间序列分解示意</h4>
                <div className="w-full">
                  <svg viewBox="0 0 640 300" className="w-full h-auto">
                    <defs>
                      <linearGradient id="tsGrad" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
                      </linearGradient>
                    </defs>
                    <text x="320" y="22" textAnchor="middle" className={`text-sm font-bold ${theme === 'dark' ? 'fill-gray-200' : 'fill-gray-800'}`}>时间序列分解（加性）</text>
                    {/* 原始序列 */}
                    <text x="20" y="55" className={`text-xs ${theme === 'dark' ? 'fill-gray-300' : 'fill-gray-700'}`}>原始</text>
                    <path d="M40 60 C 120 30, 160 90, 240 60 S 360 85, 440 60 S 560 85, 600 60" fill="none" stroke={theme === 'dark' ? '#60a5fa' : '#2563eb'} strokeWidth="2"/>
                    {/* 趋势 */}
                    <text x="20" y="115" className={`text-xs ${theme === 'dark' ? 'fill-gray-300' : 'fill-gray-700'}`}>趋势</text>
                    <line x1="40" y1="120" x2="600" y2="100" stroke={theme === 'dark' ? '#10b981' : '#10b981'} strokeWidth="3"/>
                    {/* 季节 */}
                    <text x="20" y="175" className={`text-xs ${theme === 'dark' ? 'fill-gray-300' : 'fill-gray-700'}`}>季节</text>
                    <path d="M40 180 Q 80 150, 120 180 T 200 180 T 280 180 T 360 180 T 440 180 T 520 180 T 600 180" fill="none" stroke={theme === 'dark' ? '#fbbf24' : '#f59e0b'} strokeWidth="2"/>
                    {/* 残差 */}
                    <text x="20" y="235" className={`text-xs ${theme === 'dark' ? 'fill-gray-300' : 'fill-gray-700'}`}>残差</text>
                    <rect x="40" y="220" width="560" height="30" fill="url(#tsGrad)" />
                    <path d="M40 235 L 80 225 L 120 245 L 160 232 L 200 240 L 240 228 L 280 242 L 320 230 L 360 245 L 400 235 L 440 238 L 480 230 L 520 242 L 560 236 L 600 240" fill="none" stroke={theme === 'dark' ? '#93c5fd' : '#3b82f6'} strokeWidth="1.5"/>
                  </svg>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}

// 异常检测模块
export const AnomalyDetectionModule: React.FC<AdvancedModulesProps> = ({ theme }) => {
  return (
    <>
      <div className="relative flex items-center justify-center py-4">
        <div className={`absolute inset-0 flex items-center ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
        </div>
        <div className="relative px-4 text-red-500 font-bold">◆ ◆ ◆</div>
      </div>

      <section id="anomaly-detection">
        <div className="relative overflow-hidden rounded-xl p-6 mb-6 bg-gradient-to-r from-red-500 via-rose-500 to-pink-500 shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-white rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">⚠️ 11. 异常检测</h2>
            </div>
            <p className="text-red-50 ml-7">发现数据中的异常值和欺诈行为</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardContent className="pt-6 space-y-6">
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-red-400' : 'text-red-600'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} Isolation Forest ⭐⭐⭐⭐⭐</h4>
                <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
{`from sklearn.ensemble import IsolationForest

# 训练Isolation Forest
iso_forest = IsolationForest(contamination=0.1, random_state=42)
predictions = iso_forest.fit_predict(X)

# -1表示异常值，1表示正常值
anomalies = X[predictions == -1]
print(f"检测到 {len(anomalies)} 个异常值")`}
                </pre>
              </div>

              {/* One-Class SVM */}
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-rose-900/20 border border-rose-700' : 'bg-rose-50 border border-rose-200'}`}>
                <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-rose-300' : 'text-rose-700'}`}>🧠 One-Class SVM ⭐⭐⭐⭐</h4>
                <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-rose-200'}`}>
{`from sklearn.svm import OneClassSVM

ocs = OneClassSVM(kernel='rbf', gamma='auto', nu=0.05)
pred = ocs.fit_predict(X)
anomalies = X[pred == -1]
print('异常数:', (pred == -1).sum())`}
                </pre>
              </div>

              {/* LOF */}
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20 border border-orange-700' : 'bg-orange-50 border border-orange-200'}`}>
                <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-orange-300' : 'text-orange-700'}`}>📍 局部离群因子（LOF）⭐⭐⭐⭐</h4>
                <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-orange-200'}`}>
{`from sklearn.neighbors import LocalOutlierFactor

lof = LocalOutlierFactor(n_neighbors=20, contamination=0.05)
y_pred = lof.fit_predict(X)
scores = -lof.negative_outlier_factor_
threshold = np.percentile(scores, 95)
anomalies = X[scores > threshold]`}
                </pre>
              </div>

              {/* 异常点可视化示意 */}
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} 异常点可视化示意</h4>
                <svg viewBox="0 0 400 220" className="w-full h-auto">
                  <rect x="20" y="20" width="360" height="180" fill="none" stroke={theme === 'dark' ? '#6b7280' : '#9ca3af'} />
                  {/* 正常点 */}
                  <g fill={theme === 'dark' ? '#60a5fa' : '#2563eb'} opacity="0.8">
                    <circle cx="80" cy="140" r="4" />
                    <circle cx="120" cy="120" r="4" />
                    <circle cx="140" cy="100" r="4" />
                    <circle cx="180" cy="110" r="4" />
                    <circle cx="210" cy="90" r="4" />
                    <circle cx="240" cy="80" r="4" />
                    <circle cx="260" cy="95" r="4" />
                    <circle cx="300" cy="85" r="4" />
                  </g>
                  {/* 异常点 */}
                  <g stroke={theme === 'dark' ? '#f87171' : '#dc2626'} strokeWidth="2">
                    <line x1="320" y1="50" x2="330" y2="60" />
                    <line x1="330" y1="50" x2="320" y2="60" />
                    <line x1="60" y1="70" x2="70" y2="80" />
                    <line x1="70" y1="70" x2="60" y2="80" />
                  </g>
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}

// 降维与可视化模块
export const DimensionalityReductionModule: React.FC<AdvancedModulesProps> = ({ theme }) => {
  return (
    <>
      <div className="relative flex items-center justify-center py-4">
        <div className={`absolute inset-0 flex items-center ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        </div>
        <div className="relative px-4 text-purple-500 font-bold">◆ ◆ ◆</div>
      </div>

      <section id="dimensionality-reduction">
        <div className="relative overflow-hidden rounded-xl p-6 mb-6 bg-gradient-to-r from-purple-500 via-violet-500 to-fuchsia-500 shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-white rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">📉 12. 降维与可视化</h2>
            </div>
            <p className="text-purple-50 ml-7">高维数据可视化，理解复杂数据结构</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardContent className="pt-6 space-y-6">
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-purple-400' : 'text-purple-600'}`}>🔮 PCA主成分分析 ⭐⭐⭐⭐⭐</h4>
                <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
{`from sklearn.decomposition import PCA

# PCA降维
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X)

# 查看解释方差比
print("解释方差比:", pca.explained_variance_ratio_)
print("累计解释方差:", pca.explained_variance_ratio_.cumsum())`}
                </pre>
              </div>

              {/* t-SNE 可视化 */}
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-fuchsia-900/20 border border-fuchsia-700' : 'bg-fuchsia-50 border border-fuchsia-200'}`}>
                <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-fuchsia-300' : 'text-fuchsia-700'}`}>🌀 t-SNE 可视化 ⭐⭐⭐⭐</h4>
                <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-fuchsia-200'}`}>
{`from sklearn.manifold import TSNE

tsne = TSNE(n_components=2, perplexity=30, learning_rate=200, random_state=42)
X_tsne = tsne.fit_transform(X)
print(X_tsne[:5])`}
                </pre>
              </div>

              {/* UMAP 可视化 */}
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-violet-900/20 border border-violet-700' : 'bg-violet-50 border border-violet-200'}`}>
                <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-violet-300' : 'text-violet-700'}`}>🌌 UMAP 可视化 ⭐⭐⭐⭐</h4>
                <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-violet-200'}`}>
{`# pip install umap-learn
import umap

reducer = umap.UMAP(n_components=2, random_state=42)
X_umap = reducer.fit_transform(X)
print(X_umap[:5])`}
                </pre>
              </div>

              {/* 2D 分布示意图 */}
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-purple-300' : 'text-purple-700'}`}>📊 2D降维分布示意</h4>
                <svg viewBox="0 0 400 220" className="w-full h-auto">
                  <rect x="20" y="20" width="360" height="180" fill="none" stroke={theme === 'dark' ? '#6b7280' : '#9ca3af'} />
                  <g fill={theme === 'dark' ? '#8b5cf6' : '#7c3aed'} opacity="0.8">
                    <circle cx="90" cy="150" r="4" />
                    <circle cx="110" cy="135" r="4" />
                    <circle cx="130" cy="120" r="4" />
                    <circle cx="120" cy="160" r="4" />
                  </g>
                  <g fill={theme === 'dark' ? '#06b6d4' : '#0891b2'} opacity="0.8">
                    <circle cx="260" cy="70" r="4" />
                    <circle cx="280" cy="85" r="4" />
                    <circle cx="300" cy="75" r="4" />
                    <circle cx="290" cy="95" r="4" />
                  </g>
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}

// 集成学习模块
export const EnsembleLearningModule: React.FC<AdvancedModulesProps> = ({ theme }) => {
  return (
    <>
      <div className="relative flex items-center justify-center py-4">
        <div className={`absolute inset-0 flex items-center ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-green-500 to-transparent"></div>
        </div>
        <div className="relative px-4 text-green-500 font-bold">◆ ◆ ◆</div>
      </div>

      <section id="ensemble-learning">
        <div className="relative overflow-hidden rounded-xl p-6 mb-6 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-white rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">🚀 13. 集成学习深度解析</h2>
            </div>
            <p className="text-green-50 ml-7">LightGBM、CatBoost提升模型性能</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardContent className="pt-6 space-y-6">
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-green-400' : 'text-green-600'}`}> {getLucideIcon('⚡', 'inline w-6 h-6 text-[#19bcc8]')} LightGBM ⭐⭐⭐⭐⭐</h4>
                <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
{`# pip install lightgbm
import lightgbm as lgb

# 训练LightGBM
lgb_model = lgb.LGBMClassifier(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=5,
    random_state=42
)
lgb_model.fit(X_train, y_train)`}
                </pre>
              </div>

              {/* GBDT（GradientBoosting） */}
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-green-900/20 border border-green-700' : 'bg-green-50 border border-green-200'}`}>
                <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-green-300' : 'text-green-700'}`}>🌳 GBDT（GradientBoosting）⭐⭐⭐⭐</h4>
                <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-green-200'}`}>
{`from sklearn.ensemble import GradientBoostingClassifier

gbdt = GradientBoostingClassifier(
    n_estimators=200,
    learning_rate=0.05,
    max_depth=3,
    random_state=42
)
gbdt.fit(X_train, y_train)
print('准确率:', gbdt.score(X_test, y_test))`}
                </pre>
              </div>

              {/* CatBoost */}
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-emerald-900/20 border border-emerald-700' : 'bg-emerald-50 border border-emerald-200'}`}>
                <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-emerald-300' : 'text-emerald-700'}`}>🐱 CatBoost（类别友好）⭐⭐⭐⭐</h4>
                <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-emerald-200'}`}>
{`# pip install catboost
from catboost import CatBoostClassifier

model = CatBoostClassifier(
    iterations=200,
    depth=6,
    learning_rate=0.1,
    verbose=False
)
model.fit(X_train, y_train, cat_features=[0, 3, 5])`}
                </pre>
              </div>

              {/* Stacking */}
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-teal-900/20 border border-teal-700' : 'bg-teal-50 border border-teal-200'}`}>
                <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-teal-300' : 'text-teal-700'}`}>🧱 Stacking 模型融合 ⭐⭐⭐⭐</h4>
                <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-teal-200'}`}>
{`from sklearn.ensemble import StackingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.tree import DecisionTreeClassifier
from sklearn.svm import SVC

estimators = [
    ('dt', DecisionTreeClassifier(max_depth=5)),
    ('svm', SVC(probability=True))
]
stack = StackingClassifier(
    estimators=estimators,
    final_estimator=LogisticRegression()
)
stack.fit(X_train, y_train)`}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </>
  )
}

// 模型部署与监控模块
export const ModelDeploymentModule: React.FC<AdvancedModulesProps> = ({ theme }) => {
  return (
    <>
      <div className="relative flex items-center justify-center py-4">
        <div className={`absolute inset-0 flex items-center ${theme === 'dark' ? 'opacity-20' : 'opacity-30'}`}>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-orange-500 to-transparent"></div>
        </div>
        <div className="relative px-4 text-orange-500 font-bold">◆ ◆ ◆</div>
      </div>

      <section id="model-deployment">
        <div className="relative overflow-hidden rounded-xl p-6 mb-6 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-white rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">🛠️ 14. 模型部署与监控</h2>
            </div>
            <p className="text-orange-50 ml-7">将模型投入生产环境</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
            <CardContent className="pt-6 space-y-6">
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-orange-400' : 'text-orange-600'}`}>💾 模型保存与加载 ⭐⭐⭐⭐⭐</h4>
                <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-gray-200'}`}>
{`import joblib

# 保存模型
joblib.dump(model, 'model.pkl')

# 加载模型
loaded_model = joblib.load('model.pkl')
predictions = loaded_model.predict(X_test)`}
                </pre>
              </div>

              {/* FastAPI 部署 */}
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-orange-900/20 border border-orange-700' : 'bg-orange-50 border border-orange-200'}`}>
                <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-orange-300' : 'text-orange-700'}`}>� {getLucideIcon('�', 'inline w-6 h-6 text-[#19bcc8]')} FastAPI 在线服务 ⭐⭐⭐⭐</h4>
                <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-orange-200'}`}>
{`# app.py
import joblib
from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()
model = joblib.load('model.pkl')

class Item(BaseModel):
    features: list

@app.post('/predict')
def predict(item: Item):
    import numpy as np
    x = np.array(item.features).reshape(1, -1)
    proba = model.predict_proba(x)[0, 1]
    return {'prob': float(proba)}

# 运行: uvicorn app:app --reload`}
                </pre>
              </div>

              {/* 监控与告警 */}
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-red-900/20 border border-red-700' : 'bg-red-50 border border-red-200'}`}>
                <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-red-300' : 'text-red-700'}`}>🔔 监控与告警 ⭐⭐⭐⭐</h4>
                <pre className={`text-xs overflow-x-auto p-3 rounded ${theme === 'dark' ? 'bg-black text-green-400' : 'bg-white text-gray-800'} border ${theme === 'dark' ? 'border-gray-700' : 'border-red-200'}`}>
{`# 简易监控示意（伪代码）
import numpy as np

def monitor(data_batch):
    # 1) 延迟/错误率
    # 2) 数据漂移: 比较线上特征均值/方差与训练数据
    drift = np.abs(data_batch.mean() - train_mean) > 3 * train_std
    if drift.any():
        send_alert('Data drift detected')

def send_alert(msg):
    # push 企业微信/钉钉/Slack Webhook
    pass`}
                </pre>
              </div>

              {/* 架构示意图 */}
              <div className={`p-4 rounded-lg ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`}>
                <h4 className={`font-bold mb-3 ${theme === 'dark' ? 'text-orange-300' : 'text-orange-700'}`}>🧭 部署架构示意</h4>
                <svg viewBox="0 0 600 220" className="w-full h-auto">
                  <rect x="20" y="20" width="560" height="180" fill="none" stroke={theme === 'dark' ? '#6b7280' : '#9ca3af'} />
                  <rect x="40" y="50" width="120" height="60" fill={theme === 'dark' ? '#1f2937' : '#ffffff'} stroke="#f59e0b" />
                  <text x="100" y="85" textAnchor="middle" className={`text-xs ${theme === 'dark' ? 'fill-orange-300' : 'fill-orange-700'}`}>Client</text>
                  <rect x="200" y="50" width="160" height="60" fill={theme === 'dark' ? '#1f2937' : '#ffffff'} stroke="#10b981" />
                  <text x="280" y="85" textAnchor="middle" className={`text-xs ${theme === 'dark' ? 'fill-emerald-300' : 'fill-emerald-700'}`}>FastAPI Service</text>
                  <rect x="400" y="50" width="160" height="60" fill={theme === 'dark' ? '#1f2937' : '#ffffff'} stroke="#3b82f6" />
                  <text x="480" y="85" textAnchor="middle" className={`text-xs ${theme === 'dark' ? 'fill-blue-300' : 'fill-blue-700'}`}>Model Store</text>
                  <line x1="160" y1="80" x2="200" y2="80" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)"/>
                  <line x1="360" y1="80" x2="400" y2="80" stroke="#6b7280" strokeWidth="2" markerEnd="url(#arrow)"/>
                  <defs>
                    <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto">
                      <path d="M0,0 L10,5 L0,10 z" fill="#6b7280" />
                    </marker>
                  </defs>
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* 模型上线监控与自动化联动 - 完整版 */}
      <section id="ml-ops-automation">
        <div className="relative overflow-hidden rounded-xl p-6 mb-6 bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-white rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">📡 模型上线监控与自动化联动</h2>
            </div>
            <p className="text-indigo-50 ml-7">监控SLA（时延/错误率）与数据漂移（PSI/KS），结合自动化页面通用库定时告警与重训</p>
          </div>
        </div>

        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6 space-y-6">
            <div className={`${theme==='dark'?'bg-gray-900':'bg-gray-50'} p-4 rounded-lg`}>
              <h4 className={`font-bold mb-2 ${theme==='dark'?'text-indigo-300':'text-indigo-700'}`}>📊 关键监控指标（建议）</h4>
              <ul className={`text-sm grid md:grid-cols-2 gap-2 ${theme==='dark'?'text-gray-300':'text-gray-700'}`}>
                <li>• 服务SLA：P95/P99预测时延、错误率（5xx）、QPS</li>
                <li>• 业务指标：AUC/Recall@TopK、MAPE/RMSE（离线抽样评估）</li>
                <li>• 数据分布：特征PSI/KS、目标漂移、缺失率/常量率</li>
                <li>• 版本一致性：特征列顺序/预处理参数/模型版本</li>
              </ul>
            </div>

            <div className={`${theme==='dark'?'bg-gray-800':'bg-white'} p-4 rounded-lg border ${theme==='dark'?'border-gray-700':'border-gray-200'}`}>
              <h4 className={`font-bold mb-2 ${theme==='dark'?'text-indigo-300':'text-indigo-700'}`}>💻 漂移监控脚本示例（PSI + 告警）</h4>
              <pre className={`text-xs overflow-x-auto p-3 rounded ${theme==='dark'?'bg-black text-green-400 border border-gray-700':'bg-gray-50 text-gray-800 border border-gray-200'}`}>
{`import numpy as np, pandas as pd
from sqlalchemy import text
from libs import get_engine, safe_request

def psi(expected: pd.Series, actual: pd.Series, bins: int = 10) -> float:
    e_perc, _ = np.histogram(expected, bins=bins, range=(expected.min(), expected.max()))
    a_perc, _ = np.histogram(actual, bins=bins, range=(expected.min(), expected.max()))
    e_perc = e_perc / (e_perc.sum()+1e-9)
    a_perc = a_perc / (a_perc.sum()+1e-9)
    return float(np.sum((a_perc - e_perc) * np.log((a_perc+1e-9) / (e_perc+1e-9))))

def monitor_feature_psi(feature: str, train_tbl: str, online_tbl: str, threshold: float = 0.2):
    eng = get_engine()
    with eng.connect() as conn:
        train = pd.read_sql(text(f"SELECT {feature} FROM {train_tbl} WHERE ds>=DATE_SUB(CURDATE(), INTERVAL 30 DAY)"), conn)
        online = pd.read_sql(text(f"SELECT {feature} FROM {online_tbl} WHERE ds>=DATE_SUB(CURDATE(), INTERVAL 1 DAY)"), conn)
    score = psi(train[feature].dropna(), online[feature].dropna())
    if score > threshold:
        safe_request(
            url='YOUR_DINGTALK_WEBHOOK',
            payload={"msgtype":"markdown","markdown":{"title":"模型漂移预警","text":f"### ⚠️ {feature} PSI={score:.3f} > {threshold}"}}
        )
        print(f'⚠️ 漂移预警已发送')
    else:
        print(f'✅ {feature} PSI={score:.3f}')`}
              </pre>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* 常见错误与避坑指南 - 完整版 */}
      <section id="deployment-pitfalls">
        <div className="relative overflow-hidden rounded-xl p-6 mb-6 bg-gradient-to-r from-rose-500 via-pink-500 to-red-500 shadow-lg">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="relative">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-8 bg-white rounded-full"></div>
              <h2 className="text-2xl font-bold text-white">⚠️ 常见错误与避坑指南</h2>
            </div>
            <p className="text-rose-50 ml-7">数据泄漏、数据泄露、过拟合、指标错用、数据漂移、上线不一致等高频问题</p>
          </div>
        </div>

        <Card className={theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white'}>
          <CardContent className="pt-6 space-y-6">
            <div className="grid md:grid-cols-2 gap-4">
              {[ 
                {title:'数据泄漏（最致命）', fix:['严格按时间切分Train/Test','交叉特征只用历史信息','使用Pipeline避免提前拟合']},
                {title:'过拟合', fix:['交叉验证监控','正则化/早停','简化模型/特征']},
                {title:'指标错用', fix:['样本不均衡避免Accuracy','分类关注AUC/F1/Recall','回归用RMSE/R²/ MAPE']},
                {title:'数据漂移', fix:['监控特征分布（KS/PSI）','定期重训','上线前后AB对齐']},
                {title:'上线不一致', fix:['保存列名与顺序','统一预处理Pipeline','版本化模型与特征']},
                {title:'泄漏特征（未来信息）', fix:['删除结论后变量','仅用预测时可用字段','审核SQL与特征表来源']}
              ].map((x,i)=> (
                <div key={i} className={`p-4 rounded-lg border ${theme==='dark'?'bg-rose-900/20 border-rose-700':'bg-rose-50 border-rose-200'}`}>
                  <p className={`font-bold mb-2 ${theme==='dark'?'text-rose-300':'text-rose-700'}`}>{x.title}</p>
                  <ul className={`text-xs space-y-1 ${theme==='dark'?'text-gray-300':'text-gray-700'}`}>
                    {x.fix.map((f,idx)=> <li key={idx}>• {f}</li>)}
                  </ul>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </section>
    </>
  )
}

