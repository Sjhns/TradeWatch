import React, { useState } from "react";
import {
  LineChart,
  BarChart3,
  TrendingUp,
  Building2,
  Shield,
  Zap,
  ArrowRight,
  ChevronRight,
  CheckCircle2,
  Users,
  Globe2,
  Sparkles,
  Gift,
  Menu,
  X,
} from "lucide-react";

function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // faça ancoragem para cada seção
  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const goToApp = () => {
    window.open("https://trade-watch-two.vercel.app", "_blank");
  };

  return (
    <div className="min-h-screen bg-[#0A0F1C] text-white font-sans">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-3xl"></div>
        <nav className="relative container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full"></div>
                <LineChart className="relative w-8 sm:w-10 h-8 sm:h-10 text-blue-400" />
              </div>
              <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                TradeWatch
              </span>
              <span className="px-2 py-1 text-xs bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full text-blue-400 border border-blue-500/20">
                Beta
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-10">
              <button
                onClick={() => scrollTo("stats")}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Recursos
              </button>
              <button
                onClick={() => scrollTo("features")}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Roadmap
              </button>
              <button
                onClick={() => scrollTo("benefits")}
                className="text-gray-300 hover:text-white transition-colors"
              >
                Sobre
              </button>
              <a
                href="https://trade-watch-two.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[1px] rounded-full"
              >
                <div className="bg-[#0A0F1C] px-6 py-3 rounded-full group-hover:bg-transparent transition-all duration-300">
                  <span>Criar Conta</span>
                </div>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="absolute z-30 top-full left-0 right-0 bg-[#0A0F1C]/95 backdrop-blur-lg border-t border-white/10 p-4 md:hidden space-y-4">
              <button className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white transition-colors">
                Recursos
              </button>
              <button className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white transition-colors">
                Roadmap
              </button>
              <button className="block w-full text-left px-4 py-2 text-gray-300 hover:text-white transition-colors">
                Sobre
              </button>
              <a
                href="https://trade-watch-two.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-[1px] rounded-full"
              >
                <div className="bg-[#0A0F1C] px-6 py-3 rounded-full text-center hover:bg-transparent transition-all duration-300">
                  <span>Criar Conta</span>
                </div>
              </a>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <div className="relative container mx-auto px-4 sm:px-6 pt-8 sm:pt-16 pb-16 sm:pb-24">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            <div className="space-y-6 sm:space-y-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full text-blue-400 text-sm border border-blue-500/20">
                  <Gift className="w-4 h-4" />
                  <span>100% Gratuito</span>
                </div>
                <div className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full text-purple-400 text-sm border border-purple-500/20">
                  <Sparkles className="w-4 h-4" />
                  <span>Para Sempre</span>
                </div>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                Monitore seus
                <span className="relative">
                  <span className="absolute inset-x-0 bottom-2 h-3 bg-gradient-to-r from-blue-400/40 to-purple-400/40 -skew-y-3"></span>
                  <span className="relative"> investimentos com</span>
                </span>
                <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                  {" "}
                  inteligência
                </span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-400 leading-relaxed">
                Acompanhe ações e fundos imobiliários através de um dashboard
                interativo. Tome decisões informadas com dados em tempo real e
                visualizações interativas.
                <span className="block mt-2 text-blue-400">
                  Totalmente gratuito, hoje e sempre!
                </span>
              </p>
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                <button
                  onClick={goToApp}
                  className="group bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-6 sm:px-8 py-4 rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center space-x-2"
                >
                  <span>Criar Conta Gratuita</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button
                  onClick={() => scrollTo("features")}
                  className="group text-gray-400 hover:text-white transition-colors flex items-center justify-center space-x-2"
                >
                  <span>Ver Roadmap</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
              <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 pt-8">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 sm:w-12 h-10 sm:h-12 rounded-full border-2 border-[#0A0F1C] overflow-hidden"
                    >
                      <img
                        src={`https://i.pravatar.cc/100?img=${i}`}
                        alt={`User ${i}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-sm sm:text-base">
                  <div className="font-semibold">+2.500 usuários ativos</div>
                  <div className="text-gray-400">
                    já estão usando gratuitamente
                  </div>
                </div>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl"></div>
              <img
                src="./assets/dash.avif"
                alt="Dashboard Preview"
                className="relative rounded-3xl shadow-2xl animate-float border border-white/10"
              />
              <div className="absolute -right-8 -bottom-8 bg-gradient-to-br from-blue-500 to-purple-500 p-6 rounded-2xl shadow-xl">
                <div className="flex items-center space-x-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                  <div>
                    <div className="text-sm font-medium">Performance</div>
                    <div className="text-2xl font-bold">+27.4%</div>
                  </div>
                </div>
              </div>
              <div className="absolute -left-8 top-1/2 bg-gradient-to-br from-purple-500 to-pink-500 px-4 py-2 rounded-xl shadow-xl">
                <div className="flex items-center space-x-2">
                  <Gift className="w-5 h-5 text-white animate-pulse-slow" />
                  <span className="text-sm font-medium">100% Gratuito</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section
        id="stats"
        className="py-12 sm:py-16 bg-gradient-to-b from-[#0A0F1C] to-[#0A0F1C]/95"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <StatCard
              icon={<Users className="w-8 h-8 text-blue-400" />}
              value="+2.500"
              label="Usuários Ativos"
            />
            <StatCard
              icon={<Globe2 className="w-8 h-8 text-purple-400" />}
              value="R$ 1.2M+"
              label="Ativos Monitorados"
            />
            <StatCard
              icon={<CheckCircle2 className="w-8 h-8 text-pink-400" />}
              value="99.9%"
              label="Uptime Garantido"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 sm:py-32 bg-[#0A0F1C]/95">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full text-blue-400 text-sm border border-blue-500/20 mb-6">
              <span>Recursos Disponíveis</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Recursos Poderosos para Investidores Inteligentes
            </h2>
            <p className="text-base sm:text-lg text-gray-400">
              Ferramentas avançadas que transformam dados complexos em insights
              acionáveis, totalmente gratuitas para sempre
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <FeatureCard
              icon={<BarChart3 className="w-12 h-12 text-blue-400" />}
              title="Dashboard Interativo"
              description="Visualize o desempenho da sua carteira com gráficos dinâmicos e atualizações em tempo real"
              available={true}
            />
            <FeatureCard
              icon={<TrendingUp className="w-12 h-12 text-purple-400" />}
              title="Destaques de Performance"
              description="Acompanhe seus melhores e piores ativos com estatísticas detalhadas"
              available={true}
            />
            <FeatureCard
              icon={<Building2 className="w-12 h-12 text-pink-400" />}
              title="Fundos Imobiliários"
              description="Ferramentas especializadas para monitorar seus investimentos em FIIs"
              available={true}
            />
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section
        id="benefits"
        className="py-24 sm:py-32 bg-gradient-to-b from-[#0A0F1C] to-[#0A0F1C]/90"
      >
        <div className="container mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full text-blue-400 text-sm border border-blue-500/20">
                <span>Por que escolher</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold">
                Por que escolher o TradeWatch?
              </h2>
              <div className="space-y-8">
                <Benefit
                  icon={<Gift className="w-8 h-8 text-blue-400" />}
                  title="100% Gratuito"
                  description="Todas as funcionalidades disponíveis gratuitamente, para sempre"
                />
                <Benefit
                  icon={<Shield className="w-8 h-8 text-purple-400" />}
                  title="Seguro e Confiável"
                  description="Seus dados protegidos com segurança de nível empresarial"
                />
                <Benefit
                  icon={<Zap className="w-8 h-8 text-pink-400" />}
                  title="Atualizações Constantes"
                  description="Novos recursos e melhorias adicionados regularmente"
                />
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-3xl blur-3xl"></div>
              <img
                src="./assets/Preview.png"
                alt="Interface da Plataforma"
                className="relative rounded-3xl shadow-2xl border border-white/10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24 sm:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-3xl"></div>
        <div className="relative container mx-auto px-4 sm:px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full text-blue-400 text-sm border border-blue-500/20 mb-8">
              <Gift className="w-4 h-4" />
              <span>100% Gratuito</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold mb-8">
              Comece a Transformar seus Investimentos Hoje
            </h2>
            <p className="text-lg sm:text-xl mb-12 text-gray-300">
              Junte-se aos investidores que já estão usando o TradeWatch
              gratuitamente
            </p>
            <button
              onClick={goToApp}
              className="w-full sm:w-auto group bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 px-8 sm:px-10 py-4 rounded-full text-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
            >
              Criar Conta Gratuita
            </button>
            <p className="mt-4 text-sm text-gray-400">
              Sem cartão de crédito • Acesso imediato • Gratuito para sempre
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#070B14] py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-400/20 blur-xl rounded-full"></div>
                <LineChart className="relative w-8 h-8 text-blue-400" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                TradeWatch
              </span>
              <span className="px-2 py-1 text-xs bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full text-blue-400 border border-blue-500/20">
                Beta
              </span>
            </div>
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} TradeWatch. Todos os direitos
              reservados.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  value: string;
  label: string;
}

function StatCard({ icon, value, label }: Readonly<StatCardProps>) {
  return (
    <div className="group bg-gradient-to-b from-white/5 to-white/0 p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-white/20 transition-colors">
      <div className="flex items-center space-x-4">
        <div className="p-3 bg-gradient-to-b from-white/10 to-white/5 rounded-2xl">
          {icon}
        </div>
        <div>
          <div className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {value}
          </div>
          <div className="text-sm sm:text-base text-gray-400">{label}</div>
        </div>
      </div>
    </div>
  );
}

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  available?: boolean;
}

function FeatureCard({
  icon,
  title,
  description,
  available = true,
}: Readonly<FeatureCardProps>) {
  return (
    <div className="group relative bg-gradient-to-b from-white/5 to-white/0 p-6 sm:p-8 rounded-3xl hover:shadow-2xl hover:shadow-blue-500/5 transition-all duration-300 hover:-translate-y-2 border border-white/10">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-purple-500/0 to-pink-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-pink-500/10 rounded-3xl transition-all duration-300"></div>
      <div className="relative">
        <div className="mb-6 p-3 bg-white/5 rounded-2xl inline-block">
          {icon}
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <h3 className="text-lg sm:text-xl font-semibold">{title}</h3>
          {available && (
            <span className="px-2 py-1 text-xs bg-gradient-to-r from-green-500/10 to-green-500/10 rounded-full text-green-400 border border-green-500/20">
              Disponível
            </span>
          )}
        </div>
        <p className="text-sm sm:text-base text-gray-400">{description}</p>
      </div>
    </div>
  );
}

function Benefit({
  icon,
  title,
  description,
}: Readonly<{ icon: React.ReactNode; title: string; description: string }>) {
  return (
    <div className="flex items-start space-x-6">
      <div className="p-3 bg-gradient-to-b from-white/10 to-white/5 rounded-2xl border border-white/10">
        {icon}
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm sm:text-base text-gray-400">{description}</p>
      </div>
    </div>
  );
}

export default App;
