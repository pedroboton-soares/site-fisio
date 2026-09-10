# Prompts, Processo de Construção do Site

Registro do processo, um trecho por etapa dos 8 passos.

## Etapa 1 - Requisitos

Escrevi os requisitos funcionais e não funcionais antes de pedir qualquer código, com base na pesquisa da atividade anterior (especialidades, localização, forma de agendamento). Arquivo: `REQUISITOS.md`.

## Etapa 2 - Insumos e referências

Reuni 3 sites de referência (Doctoralia, Fresha, SimplyBook.me), print de cada um, paleta de cores e restrições do que a IA não pode fazer. Arquivo: `INSUMOS.md`.

## Etapa 3 - Plano, sem código

Prompt usado (nas três ferramentas, mesmo texto):
```
Este é o projeto de um site para uma fisioterapeuta com atendimento
domiciliar. Vou colar os requisitos e os insumos abaixo, mais os prints
de 3 sites de referência.

Antes de escrever qualquer código, me devolva só o PLANO da estrutura do
site: quais seções, em que ordem, o que cada uma vai ter. Não escreva
HTML, CSS ou JS ainda.

[REQUISITOS.md colado]
[INSUMOS.md colado]
```

Pedi o plano ao ChatGPT, Gemini e Perplexity, com o mesmo prompt. O ChatGPT e o Gemini trouxeram planos completos e parecidos na ordem das seções; o Gemini foi o único a detalhar observações técnicas (HTML semântico, variáveis CSS, lazy loading). O Perplexity foi o único a propor um formulário de pré-agendamento como canal complementar ao WhatsApp, respondendo ao requisito de validação de campo obrigatório. Combinei os três num plano final: estrutura e ordem do ChatGPT/Gemini, formulário complementar do Perplexity, observações técnicas do Gemini.

## Etapa 4 - Desenvolvimento em etapas

Usei o ChatGPT pra gerar o código, em três pedidos separados, cada um construindo em cima do anterior.

**1º prompt (estrutura):** pedi o HTML das 10 seções do plano final, com tags semânticas, sem CSS nem JS. Resultado: `index.html`, com todas as seções na ordem certa, usando `header`, `main`, `section`, `footer`, e placeholders entre colchetes para o que ainda não tínhamos (fotos, formação, WhatsApp). Depois preenchi os placeholders com os dados reais (nome completo, CREFITO, CNPJ, WhatsApp, e-mail).

**2º prompt (visual):** colei o HTML já preenchido e pedi o CSS, com a paleta de cores definida no INSUMOS.md, layout responsivo (foto e texto lado a lado no desktop, empilhado no celular), cabeçalho fixo e rolagem suave. Resultado: `estilo.css`, com variáveis CSS pra cor, três breakpoints de responsividade (tablet, celular, celular estreito), acessibilidade (foco visível, `prefers-reduced-motion`) e o menu mobile já preparado em CSS (escondido por padrão, esperando o JS pra abrir).

**3º prompt (comportamento):** colei o HTML e o CSS e pedi o JS: menu mobile funcional, rolagem suave nos links, e validação do formulário de pré-agendamento. Resultado: `script.js`, com botão de hambúrguer criado dinamicamente, fechamento do menu ao clicar em link, e validação em tempo real (ao digitar e ao sair do campo), sem mexer no HTML nem no CSS já prontos.

## Etapa 5 - Biblioteca de efeito

Escolhi o AOS (Animate On Scroll), pra fazer os cards de especialidade e as fotos da galeria aparecerem suavemente conforme a página rola. Pedi só o trecho alterado, sem tocar no resto do código já pronto. A IA devolveu exatamente as tags novas (link do CSS, atributos `data-aos`/`data-aos-delay` nos 4 cards e nas 4 fotos, script do AOS, e o `AOS.init()` dentro do `script.js`), sem mexer em mais nada.

Ao aplicar, percebi um problema que a IA não tinha avisado em nenhuma etapa anterior: o `index.html` nunca teve as tags `<link>` do `estilo.css` nem `<script>` do `script.js`. O site abriria sem estilo e sem comportamento nenhum. Corrigi isso manualmente ao integrar o AOS (fica registrado também na etapa 6, como correção encontrada por mim, não pela IA).

## Etapa 6 - Correções

Essa correção não veio de um pedido pra IA, veio de mim, revisando o código antes de testar no navegador (é exatamente o tipo de erro que o passo 8 existe pra pegar, mas encontrei antes mesmo de abrir o site):

- **O sintoma:** o `index.html` não tinha nenhuma tag `<link>` para o `estilo.css` nem `<script>` para o `script.js`. O site abriria sem nenhum estilo e sem nenhum comportamento (menu, rolagem, validação de formulário).
- **O que preservar:** todo o conteúdo e a estrutura das seções, e o restante do CSS/JS já prontos.
- **O formato da correção:** adicionei manualmente `<link rel="stylesheet" href="estilo.css">` no `<head>` e `<script src="script.js"></script>` antes do fechamento do `</body>` (depois do script do AOS, pra garantir que o AOS já estivesse carregado quando o `script.js` chamasse `AOS.init()`).

## Etapa 7 - Revisão em outra conversa/ferramenta

[colar o prompt de revisão usado, e o retorno resumido: o que foi marcado como cumprido, não cumprido, ou pela metade]

## Etapa 8 - Teste

Testei o site (abrir com dois cliques, sem servidor) e confirmei que está funcionando.

---

**Quem revisou o resultado final:** [outra conversa / outra ferramenta / você mesmo testando, recomenda-se os dois: revisão por IA + revisão sua]
