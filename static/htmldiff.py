from difflib import HtmlDiff
from pathlib import Path

def compare_files(file1_path: str, file2_path: str, output_path: str):
    # ファイルを読み込む
    with open(file1_path, 'r') as f1, open(file2_path, 'r') as f2:
        file1_lines = f1.readlines()
        file2_lines = f2.readlines()

    # HtmlDiffオブジェクトを作成
    diff = HtmlDiff()
    
    # 比較結果をHTMLで生成
    html_diff = diff.make_file(
        file1_lines, 
        file2_lines,
        file1_path,  # 1つ目のファイルの表示名
        file2_path,  # 2つ目のファイルの表示名
        context=True,  # 文脈を表示
        numlines=3     # 表示する文脈の行数
    )

    # 結果をファイルに保存
    with open(output_path, 'w') as f:
        f.write(html_diff)

# 使用例
compare_files('hoge1.txt', 'hoge2.txt', 'diff_result.html')
