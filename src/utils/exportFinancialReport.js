import jsPDF from "jspdf";

import autoTable
  from "jspdf-autotable";

import * as XLSX
  from "xlsx";

export function exportFinancialPDF({

  monthlyData,

  categoryData,

  totalReceitas,

  totalDespesas,

  saldoGeral,

}) {

  const doc =
    new jsPDF();

  doc.setFontSize(22);

  doc.text(
    "Relatório Financeiro",
    14,
    20
  );

  doc.setFontSize(12);

  doc.text(
    `Receitas Totais: ${totalReceitas.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}`,
    14,
    35
  );

  doc.text(
    `Despesas Totais: ${totalDespesas.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}`,
    14,
    45
  );

  doc.text(
    `Saldo Geral: ${saldoGeral.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    })}`,
    14,
    55
  );

  autoTable(doc, {

    startY: 70,

    head: [[
      "Competência",
      "Receitas",
      "Despesas",
      "Saldo",
    ]],

    body: monthlyData.map(
      (item) => [

        item.month,

        item.receitas.toLocaleString(
          "pt-BR",
          {
            style: "currency",
            currency: "BRL",
          }
        ),

        item.despesas.toLocaleString(
          "pt-BR",
          {
            style: "currency",
            currency: "BRL",
          }
        ),

        item.saldo.toLocaleString(
          "pt-BR",
          {
            style: "currency",
            currency: "BRL",
          }
        ),
      ]
    ),
  });

  autoTable(doc, {

    startY:
      doc.lastAutoTable
        .finalY + 15,

    head: [[
      "Categoria",
      "Valor",
    ]],

    body: categoryData.map(
      (item) => [

        item.name,

        item.value.toLocaleString(
          "pt-BR",
          {
            style: "currency",
            currency: "BRL",
          }
        ),
      ]
    ),
  });

  doc.save(
    "relatorio-financeiro.pdf"
  );
}

export function exportFinancialExcel({

  monthlyData,

  categoryData,

}) {

  const workbook =
    XLSX.utils.book_new();

  const monthlySheet =
    XLSX.utils.json_to_sheet(
      monthlyData
    );

  const categorySheet =
    XLSX.utils.json_to_sheet(
      categoryData
    );

  XLSX.utils.book_append_sheet(

    workbook,

    monthlySheet,

    "Fluxo Financeiro"
  );

  XLSX.utils.book_append_sheet(

    workbook,

    categorySheet,

    "Categorias"
  );

  XLSX.writeFile(

    workbook,

    "relatorio-financeiro.xlsx"
  );
}