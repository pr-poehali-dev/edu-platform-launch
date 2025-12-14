import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  duration: string;
  level: string;
  icon: string;
}

interface EnrolledCourse extends Course {
  progress: number;
  completedLessons: number;
  totalLessons: number;
}

const courses: Course[] = [
  {
    id: 1,
    title: 'Python для начинающих',
    description: 'Изучите основы программирования на Python с нуля. Практические задачи и проекты.',
    category: 'Программирование',
    price: 4990,
    duration: '8 недель',
    level: 'Начальный',
    icon: 'Code2'
  },
  {
    id: 2,
    title: 'Веб-разработка: HTML, CSS, JavaScript',
    description: 'Создавайте современные сайты. От базовой верстки до интерактивных приложений.',
    category: 'Программирование',
    price: 6990,
    duration: '12 недель',
    level: 'Начальный',
    icon: 'Globe'
  },
  {
    id: 3,
    title: 'Цифровая грамотность',
    description: 'Основы работы с компьютером, интернетом и офисными программами.',
    category: 'Цифровая грамотность',
    price: 2990,
    duration: '4 недели',
    level: 'Базовый',
    icon: 'Monitor'
  },
  {
    id: 4,
    title: 'Математика 5-9 класс',
    description: 'Индивидуальные занятия по математике. Подготовка к ОГЭ и улучшение оценок.',
    category: 'Школьные предметы',
    price: 3500,
    duration: 'Гибкий график',
    level: 'Школьный',
    icon: 'Calculator'
  },
  {
    id: 5,
    title: 'Русский язык и литература',
    description: 'Подготовка к экзаменам, работа над грамотностью и развитие речи.',
    category: 'Школьные предметы',
    price: 3200,
    duration: 'Гибкий график',
    level: 'Школьный',
    icon: 'BookOpen'
  },
  {
    id: 6,
    title: 'Data Science и машинное обучение',
    description: 'Анализ данных, визуализация и создание ML моделей на Python.',
    category: 'Программирование',
    price: 8990,
    duration: '16 недель',
    level: 'Продвинутый',
    icon: 'Brain'
  }
];

const Index = () => {
  const [view, setView] = useState<'home' | 'dashboard'>('home');
  const [enrolledCourses, setEnrolledCourses] = useState<EnrolledCourse[]>([
    {
      ...courses[0],
      progress: 65,
      completedLessons: 13,
      totalLessons: 20
    },
    {
      ...courses[2],
      progress: 40,
      completedLessons: 6,
      totalLessons: 15
    }
  ]);

  const handleEnroll = (course: Course) => {
    const newEnrolled: EnrolledCourse = {
      ...course,
      progress: 0,
      completedLessons: 0,
      totalLessons: 20
    };
    setEnrolledCourses([...enrolledCourses, newEnrolled]);
    setView('dashboard');
  };

  const isEnrolled = (courseId: number) => {
    return enrolledCourses.some(c => c.id === courseId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-green-50">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-purple-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-green-500 rounded-xl flex items-center justify-center">
                <Icon name="GraduationCap" className="text-white" size={24} />
              </div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent">
                EduPlatform
              </h1>
            </div>
            <nav className="flex gap-2">
              <Button 
                variant={view === 'home' ? 'default' : 'ghost'}
                onClick={() => setView('home')}
                className="gap-2"
              >
                <Icon name="Home" size={18} />
                Курсы
              </Button>
              <Button 
                variant={view === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => setView('dashboard')}
                className="gap-2"
              >
                <Icon name="User" size={18} />
                Мои курсы
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {view === 'home' ? (
          <div className="animate-fade-in">
            <section className="text-center mb-16 py-12">
              <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 via-purple-500 to-green-600 bg-clip-text text-transparent">
                Обучение нового поколения
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Программирование, цифровая грамотность и школьные предметы. 
                Индивидуальный подход к каждому ученику.
              </p>
            </section>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8">
                <TabsTrigger value="all">Все курсы</TabsTrigger>
                <TabsTrigger value="programming">Программирование</TabsTrigger>
                <TabsTrigger value="digital">Цифровая грамотность</TabsTrigger>
                <TabsTrigger value="school">Школьные предметы</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course, index) => (
                  <Card 
                    key={course.id} 
                    className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white/70 backdrop-blur-sm border-purple-100 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader>
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                        <Icon name={course.icon as any} className="text-white" size={24} />
                      </div>
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                      <CardDescription className="text-sm">{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                          {course.category}
                        </Badge>
                        <Badge variant="outline">{course.level}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Icon name="Clock" size={16} />
                          <span>{course.duration}</span>
                        </div>
                        <div className="font-bold text-green-600">
                          {course.price.toLocaleString()} ₽
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700"
                        onClick={() => handleEnroll(course)}
                        disabled={isEnrolled(course.id)}
                      >
                        {isEnrolled(course.id) ? (
                          <>
                            <Icon name="CheckCircle2" size={18} className="mr-2" />
                            Вы записаны
                          </>
                        ) : (
                          <>
                            <Icon name="ShoppingCart" size={18} className="mr-2" />
                            Записаться
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="programming" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.filter(c => c.category === 'Программирование').map((course, index) => (
                  <Card 
                    key={course.id} 
                    className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white/70 backdrop-blur-sm border-purple-100 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader>
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                        <Icon name={course.icon as any} className="text-white" size={24} />
                      </div>
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                      <CardDescription className="text-sm">{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                          {course.category}
                        </Badge>
                        <Badge variant="outline">{course.level}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Icon name="Clock" size={16} />
                          <span>{course.duration}</span>
                        </div>
                        <div className="font-bold text-green-600">
                          {course.price.toLocaleString()} ₽
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700"
                        onClick={() => handleEnroll(course)}
                        disabled={isEnrolled(course.id)}
                      >
                        {isEnrolled(course.id) ? (
                          <>
                            <Icon name="CheckCircle2" size={18} className="mr-2" />
                            Вы записаны
                          </>
                        ) : (
                          <>
                            <Icon name="ShoppingCart" size={18} className="mr-2" />
                            Записаться
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="digital" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.filter(c => c.category === 'Цифровая грамотность').map((course, index) => (
                  <Card 
                    key={course.id} 
                    className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white/70 backdrop-blur-sm border-purple-100 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader>
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                        <Icon name={course.icon as any} className="text-white" size={24} />
                      </div>
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                      <CardDescription className="text-sm">{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                          {course.category}
                        </Badge>
                        <Badge variant="outline">{course.level}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Icon name="Clock" size={16} />
                          <span>{course.duration}</span>
                        </div>
                        <div className="font-bold text-green-600">
                          {course.price.toLocaleString()} ₽
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700"
                        onClick={() => handleEnroll(course)}
                        disabled={isEnrolled(course.id)}
                      >
                        {isEnrolled(course.id) ? (
                          <>
                            <Icon name="CheckCircle2" size={18} className="mr-2" />
                            Вы записаны
                          </>
                        ) : (
                          <>
                            <Icon name="ShoppingCart" size={18} className="mr-2" />
                            Записаться
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>

              <TabsContent value="school" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.filter(c => c.category === 'Школьные предметы').map((course, index) => (
                  <Card 
                    key={course.id} 
                    className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white/70 backdrop-blur-sm border-purple-100 animate-fade-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader>
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-green-500 rounded-lg flex items-center justify-center mb-4">
                        <Icon name={course.icon as any} className="text-white" size={24} />
                      </div>
                      <CardTitle className="text-xl">{course.title}</CardTitle>
                      <CardDescription className="text-sm">{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                          {course.category}
                        </Badge>
                        <Badge variant="outline">{course.level}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Icon name="Clock" size={16} />
                          <span>{course.duration}</span>
                        </div>
                        <div className="font-bold text-green-600">
                          {course.price.toLocaleString()} ₽
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700"
                        onClick={() => handleEnroll(course)}
                        disabled={isEnrolled(course.id)}
                      >
                        {isEnrolled(course.id) ? (
                          <>
                            <Icon name="CheckCircle2" size={18} className="mr-2" />
                            Вы записаны
                          </>
                        ) : (
                          <>
                            <Icon name="ShoppingCart" size={18} className="mr-2" />
                            Записаться
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        ) : (
          <div className="animate-fade-in">
            <section className="mb-12">
              <div className="bg-gradient-to-r from-purple-600 to-green-600 rounded-2xl p-8 text-white">
                <h2 className="text-4xl font-bold mb-2">Личный кабинет</h2>
                <p className="text-purple-100">Отслеживайте свой прогресс и продолжайте обучение</p>
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon name="BookOpen" className="text-purple-600" size={20} />
                    Активных курсов
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-purple-600">{enrolledCourses.length}</p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon name="Target" className="text-green-600" size={20} />
                    Средний прогресс
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-green-600">
                    {enrolledCourses.length > 0 
                      ? Math.round(enrolledCourses.reduce((acc, c) => acc + c.progress, 0) / enrolledCourses.length)
                      : 0}%
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-white/70 backdrop-blur-sm border-purple-100">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Icon name="Award" className="text-purple-600" size={20} />
                    Пройдено уроков
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold text-purple-600">
                    {enrolledCourses.reduce((acc, c) => acc + c.completedLessons, 0)}
                  </p>
                </CardContent>
              </Card>
            </div>

            <section>
              <h3 className="text-2xl font-bold mb-6 text-gray-800">Мои курсы</h3>
              {enrolledCourses.length === 0 ? (
                <Card className="bg-white/70 backdrop-blur-sm border-purple-100 p-12 text-center">
                  <Icon name="BookOpen" className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-600 text-lg mb-4">У вас пока нет активных курсов</p>
                  <Button 
                    onClick={() => setView('home')}
                    className="bg-gradient-to-r from-purple-600 to-green-600"
                  >
                    Выбрать курс
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {enrolledCourses.map((course, index) => (
                    <Card 
                      key={course.id} 
                      className="transition-all duration-300 hover:-translate-y-1 hover:shadow-xl bg-white/70 backdrop-blur-sm border-purple-100 animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                              <Icon name={course.icon as any} className="text-white" size={24} />
                            </div>
                            <div>
                              <CardTitle className="text-xl mb-1">{course.title}</CardTitle>
                              <Badge variant="secondary" className="bg-purple-100 text-purple-700">
                                {course.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-gray-700">Прогресс</span>
                            <span className="text-2xl font-bold text-purple-600">{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className="h-3" />
                        </div>
                        
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Icon name="CheckCircle2" size={16} className="text-green-600" />
                            <span>{course.completedLessons} из {course.totalLessons} уроков</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Clock" size={16} />
                            <span>{course.duration}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700">
                          <Icon name="PlayCircle" size={18} className="mr-2" />
                          Продолжить обучение
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          </div>
        )}
      </main>

      <footer className="mt-16 py-8 border-t border-purple-100 bg-white/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>© 2024 EduPlatform. Все права защищены.</p>
          <p className="text-sm mt-2">Программирование • Цифровая грамотность • Школьные предметы</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;