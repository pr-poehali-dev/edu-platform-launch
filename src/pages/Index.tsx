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

interface Student {
  id: number;
  name: string;
  email: string;
  enrolledCourses: EnrolledCourse[];
  totalProgress: number;
  joinDate: string;
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
  const [view, setView] = useState<'home' | 'dashboard' | 'payment' | 'admin'>('home');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [accessibilityMode, setAccessibilityMode] = useState(false);
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

  const [students, setStudents] = useState<Student[]>([
    {
      id: 1,
      name: 'Анна Петрова',
      email: 'anna@example.com',
      enrolledCourses: [
        { ...courses[0], progress: 85, completedLessons: 17, totalLessons: 20 },
        { ...courses[3], progress: 60, completedLessons: 9, totalLessons: 15 }
      ],
      totalProgress: 73,
      joinDate: '15.11.2024'
    },
    {
      id: 2,
      name: 'Михаил Сидоров',
      email: 'mikhail@example.com',
      enrolledCourses: [
        { ...courses[1], progress: 45, completedLessons: 9, totalLessons: 20 }
      ],
      totalProgress: 45,
      joinDate: '20.11.2024'
    },
    {
      id: 3,
      name: 'Елена Иванова',
      email: 'elena@example.com',
      enrolledCourses: [
        { ...courses[2], progress: 90, completedLessons: 14, totalLessons: 15 },
        { ...courses[4], progress: 75, completedLessons: 15, totalLessons: 20 },
        { ...courses[0], progress: 50, completedLessons: 10, totalLessons: 20 }
      ],
      totalProgress: 72,
      joinDate: '10.11.2024'
    },
    {
      id: 4,
      name: 'Дмитрий Козлов',
      email: 'dmitry@example.com',
      enrolledCourses: [
        { ...courses[5], progress: 30, completedLessons: 6, totalLessons: 20 }
      ],
      totalProgress: 30,
      joinDate: '01.12.2024'
    }
  ]);

  const handleEnroll = (course: Course) => {
    setSelectedCourse(course);
    setView('payment');
  };

  const handlePaymentSuccess = () => {
    if (selectedCourse) {
      const newEnrolled: EnrolledCourse = {
        ...selectedCourse,
        progress: 0,
        completedLessons: 0,
        totalLessons: 20
      };
      setEnrolledCourses([...enrolledCourses, newEnrolled]);
      setSelectedCourse(null);
      setView('dashboard');
    }
  };

  const isEnrolled = (courseId: number) => {
    return enrolledCourses.some(c => c.id === courseId);
  };

  const handleUnenroll = (courseId: number) => {
    setEnrolledCourses(enrolledCourses.filter(c => c.id !== courseId));
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${accessibilityMode ? 'bg-black' : 'bg-gradient-to-br from-purple-50 via-white to-green-50'}`}>
      <header className={`sticky top-0 z-50 border-b transition-colors duration-300 ${accessibilityMode ? 'bg-black border-yellow-400' : 'bg-white/80 backdrop-blur-lg border-purple-100'}`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${accessibilityMode ? 'bg-yellow-400' : 'bg-gradient-to-br from-purple-600 to-green-500'}`}>
                <Icon name="GraduationCap" className={accessibilityMode ? 'text-black' : 'text-white'} size={24} />
              </div>
              <h1 className={`text-2xl font-bold ${accessibilityMode ? 'text-yellow-400' : 'bg-gradient-to-r from-purple-600 to-green-600 bg-clip-text text-transparent'}`}>
                EduPlatform
              </h1>
            </div>
            <nav className="flex gap-2 flex-wrap">
              <Button 
                variant={view === 'home' ? 'default' : 'ghost'}
                onClick={() => setView('home')}
                className={`gap-2 ${accessibilityMode ? 'text-yellow-400 hover:bg-yellow-400 hover:text-black text-lg px-6 py-6' : ''}`}
              >
                <Icon name="Home" size={accessibilityMode ? 24 : 18} />
                Курсы
              </Button>
              <Button 
                variant={view === 'dashboard' ? 'default' : 'ghost'}
                onClick={() => setView('dashboard')}
                className={`gap-2 ${accessibilityMode ? 'text-yellow-400 hover:bg-yellow-400 hover:text-black text-lg px-6 py-6' : ''}`}
              >
                <Icon name="User" size={accessibilityMode ? 24 : 18} />
                Мои курсы
              </Button>
              <Button 
                variant={view === 'admin' ? 'default' : 'ghost'}
                onClick={() => setView('admin')}
                className={`gap-2 ${accessibilityMode ? 'text-yellow-400 hover:bg-yellow-400 hover:text-black text-lg px-6 py-6' : ''}`}
              >
                <Icon name="Shield" size={accessibilityMode ? 24 : 18} />
                Админ
              </Button>
              <Button 
                variant={accessibilityMode ? 'default' : 'outline'}
                onClick={() => setAccessibilityMode(!accessibilityMode)}
                className={`gap-2 ${accessibilityMode ? 'bg-yellow-400 text-black hover:bg-yellow-500 text-lg px-6 py-6 font-bold' : ''}`}
              >
                <Icon name="Eye" size={accessibilityMode ? 24 : 18} />
                {accessibilityMode ? 'Обычная версия' : 'Для слабовидящих'}
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {view === 'home' ? (
          <div className="animate-fade-in">
            <section className="text-center mb-16 py-12">
              <h2 className={`font-bold mb-4 ${accessibilityMode ? 'text-6xl text-yellow-400' : 'text-5xl bg-gradient-to-r from-purple-600 via-purple-500 to-green-600 bg-clip-text text-transparent'}`}>
                Обучение нового поколения
              </h2>
              <p className={`max-w-2xl mx-auto ${accessibilityMode ? 'text-3xl text-white leading-relaxed' : 'text-xl text-gray-600'}`}>
                Программирование, цифровая грамотность и школьные предметы. 
                Индивидуальный подход к каждому ученику.
              </p>
            </section>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className={`grid w-full max-w-2xl mx-auto grid-cols-4 mb-8 ${accessibilityMode ? 'bg-black border-2 border-yellow-400' : ''}`}>
                <TabsTrigger value="all" className={accessibilityMode ? 'text-yellow-400 data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-xl py-4' : ''}>Все курсы</TabsTrigger>
                <TabsTrigger value="programming" className={accessibilityMode ? 'text-yellow-400 data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-xl py-4' : ''}>Программирование</TabsTrigger>
                <TabsTrigger value="digital" className={accessibilityMode ? 'text-yellow-400 data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-xl py-4' : ''}>Цифровая грамотность</TabsTrigger>
                <TabsTrigger value="school" className={accessibilityMode ? 'text-yellow-400 data-[state=active]:bg-yellow-400 data-[state=active]:text-black text-xl py-4' : ''}>Школьные предметы</TabsTrigger>
              </TabsList>

              <TabsContent value="all" className={`grid gap-6 ${accessibilityMode ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'}`}>
                {courses.map((course, index) => (
                  <Card 
                    key={course.id} 
                    className={`transition-all duration-300 animate-fade-in ${accessibilityMode ? 'bg-black border-4 border-yellow-400 hover:border-yellow-300' : 'hover:-translate-y-1 hover:shadow-xl bg-white/70 backdrop-blur-sm border-purple-100'}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader>
                      <div className={`rounded-lg flex items-center justify-center mb-4 ${accessibilityMode ? 'w-20 h-20 bg-yellow-400' : 'w-12 h-12 bg-gradient-to-br from-purple-500 to-green-500'}`}>
                        <Icon name={course.icon as any} className={accessibilityMode ? 'text-black' : 'text-white'} size={accessibilityMode ? 40 : 24} />
                      </div>
                      <CardTitle className={accessibilityMode ? 'text-3xl text-yellow-400 mb-3' : 'text-xl'}>{course.title}</CardTitle>
                      <CardDescription className={accessibilityMode ? 'text-2xl text-white leading-relaxed' : 'text-sm'}>{course.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary" className={accessibilityMode ? 'bg-yellow-400 text-black text-xl px-4 py-2' : 'bg-purple-100 text-purple-700'}>
                          {course.category}
                        </Badge>
                        <Badge variant="outline" className={accessibilityMode ? 'border-yellow-400 text-yellow-400 text-xl px-4 py-2' : ''}>{course.level}</Badge>
                      </div>
                      <div className={`flex items-center gap-4 ${accessibilityMode ? 'text-2xl text-white' : 'text-sm text-gray-600'}`}>
                        <div className="flex items-center gap-1">
                          <Icon name="Clock" size={accessibilityMode ? 24 : 16} />
                          <span>{course.duration}</span>
                        </div>
                        <div className={`font-bold ${accessibilityMode ? 'text-yellow-400' : 'text-green-600'}`}>
                          {course.price.toLocaleString()} ₽
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className={`w-full ${accessibilityMode ? 'bg-yellow-400 text-black hover:bg-yellow-500 text-2xl py-8 font-bold' : 'bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700'}`}
                        onClick={() => handleEnroll(course)}
                        disabled={isEnrolled(course.id)}
                      >
                        {isEnrolled(course.id) ? (
                          <>
                            <Icon name="CheckCircle2" size={accessibilityMode ? 28 : 18} className="mr-2" />
                            Вы записаны
                          </>
                        ) : (
                          <>
                            <Icon name="ShoppingCart" size={accessibilityMode ? 28 : 18} className="mr-2" />
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
        ) : view === 'payment' && selectedCourse ? (
          <div className="animate-fade-in max-w-2xl mx-auto">
            <Button 
              variant="ghost" 
              onClick={() => setView('home')}
              className={`mb-6 gap-2 ${accessibilityMode ? 'text-yellow-400 hover:bg-yellow-400 hover:text-black text-xl py-6 px-6' : ''}`}
            >
              <Icon name="ArrowLeft" size={accessibilityMode ? 24 : 18} />
              Назад к курсам
            </Button>

            <Card className={accessibilityMode ? 'bg-black border-4 border-yellow-400' : 'bg-white/70 backdrop-blur-sm border-purple-100'}>
              <CardHeader>
                <CardTitle className={accessibilityMode ? 'text-5xl text-yellow-400 mb-4' : 'text-3xl mb-2'}>Оформление оплаты</CardTitle>
                <CardDescription className={accessibilityMode ? 'text-2xl text-white' : ''}>Завершите оплату, чтобы начать обучение</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className={accessibilityMode ? 'bg-black border-2 border-yellow-400 p-8 rounded-xl' : 'bg-gradient-to-br from-purple-50 to-green-50 p-6 rounded-xl'}>
                  <div className="flex gap-4 items-start">
                    <div className={`rounded-lg flex items-center justify-center flex-shrink-0 ${accessibilityMode ? 'w-24 h-24 bg-yellow-400' : 'w-16 h-16 bg-gradient-to-br from-purple-500 to-green-500'}`}>
                      <Icon name={selectedCourse.icon as any} className={accessibilityMode ? 'text-black' : 'text-white'} size={accessibilityMode ? 48 : 32} />
                    </div>
                    <div className="flex-1">
                      <h3 className={`font-bold mb-2 ${accessibilityMode ? 'text-3xl text-yellow-400' : 'text-xl'}`}>{selectedCourse.title}</h3>
                      <p className={`mb-3 ${accessibilityMode ? 'text-2xl text-white leading-relaxed' : 'text-gray-600'}`}>{selectedCourse.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="secondary" className={accessibilityMode ? 'bg-yellow-400 text-black text-xl px-4 py-2' : 'bg-purple-100 text-purple-700'}>
                          {selectedCourse.category}
                        </Badge>
                        <Badge variant="outline" className={accessibilityMode ? 'border-yellow-400 text-yellow-400 text-xl px-4 py-2' : ''}>{selectedCourse.level}</Badge>
                        <Badge variant="outline" className={`gap-1 ${accessibilityMode ? 'border-yellow-400 text-yellow-400 text-xl px-4 py-2' : ''}`}>
                          <Icon name="Clock" size={accessibilityMode ? 20 : 14} />
                          {selectedCourse.duration}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`pt-6 ${accessibilityMode ? 'border-t-2 border-yellow-400' : 'border-t border-purple-100'}`}>
                  <div className="flex justify-between items-center mb-6">
                    <span className={accessibilityMode ? 'text-3xl text-white' : 'text-lg text-gray-700'}>Стоимость курса:</span>
                    <span className={`font-bold ${accessibilityMode ? 'text-5xl text-yellow-400' : 'text-3xl text-green-600'}`}>
                      {selectedCourse.price.toLocaleString()} ₽
                    </span>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className={`flex items-center gap-3 ${accessibilityMode ? 'text-2xl text-white' : 'text-gray-600'}`}>
                      <Icon name="CheckCircle2" size={accessibilityMode ? 28 : 20} className={accessibilityMode ? 'text-yellow-400' : 'text-green-600'} />
                      <span>Доступ к материалам курса на все время</span>
                    </div>
                    <div className={`flex items-center gap-3 ${accessibilityMode ? 'text-2xl text-white' : 'text-gray-600'}`}>
                      <Icon name="CheckCircle2" size={accessibilityMode ? 28 : 20} className={accessibilityMode ? 'text-yellow-400' : 'text-green-600'} />
                      <span>Сертификат по завершению обучения</span>
                    </div>
                    <div className={`flex items-center gap-3 ${accessibilityMode ? 'text-2xl text-white' : 'text-gray-600'}`}>
                      <Icon name="CheckCircle2" size={accessibilityMode ? 28 : 20} className={accessibilityMode ? 'text-yellow-400' : 'text-green-600'} />
                      <span>Поддержка преподавателей 24/7</span>
                    </div>
                  </div>

                  <Button 
                    className={`w-full ${accessibilityMode ? 'bg-yellow-400 text-black hover:bg-yellow-500 py-10 text-3xl font-bold' : 'bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700 py-6 text-lg'}`}
                    onClick={handlePaymentSuccess}
                  >
                    <Icon name="CreditCard" size={accessibilityMode ? 32 : 20} className="mr-2" />
                    Оплатить {selectedCourse.price.toLocaleString()} ₽
                  </Button>

                  <p className={`text-center mt-4 ${accessibilityMode ? 'text-xl text-white' : 'text-sm text-gray-500'}`}>
                    Нажимая на кнопку, вы соглашаетесь с условиями оферты
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        ) : view === 'dashboard' ? (
          <div className="animate-fade-in">
            <section className="mb-12">
              <div className={`rounded-2xl p-8 ${accessibilityMode ? 'bg-black border-4 border-yellow-400' : 'bg-gradient-to-r from-purple-600 to-green-600 text-white'}`}>
                <h2 className={`font-bold mb-2 ${accessibilityMode ? 'text-6xl text-yellow-400' : 'text-4xl text-white'}`}>Личный кабинет</h2>
                <p className={accessibilityMode ? 'text-3xl text-white' : 'text-purple-100'}>Отслеживайте свой прогресс и продолжайте обучение</p>
              </div>
            </section>

            <div className={`grid gap-6 mb-12 ${accessibilityMode ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-3'}`}>
              <Card className={accessibilityMode ? 'bg-black border-4 border-yellow-400' : 'bg-white/70 backdrop-blur-sm border-purple-100'}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${accessibilityMode ? 'text-3xl' : 'text-lg'}`}>
                    <Icon name="BookOpen" className={accessibilityMode ? 'text-yellow-400' : 'text-purple-600'} size={accessibilityMode ? 32 : 20} />
                    <span className={accessibilityMode ? 'text-yellow-400' : ''}>Активных курсов</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`font-bold ${accessibilityMode ? 'text-6xl text-white' : 'text-4xl text-purple-600'}`}>{enrolledCourses.length}</p>
                </CardContent>
              </Card>

              <Card className={accessibilityMode ? 'bg-black border-4 border-yellow-400' : 'bg-white/70 backdrop-blur-sm border-purple-100'}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${accessibilityMode ? 'text-3xl' : 'text-lg'}`}>
                    <Icon name="Target" className={accessibilityMode ? 'text-yellow-400' : 'text-green-600'} size={accessibilityMode ? 32 : 20} />
                    <span className={accessibilityMode ? 'text-yellow-400' : ''}>Средний прогресс</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`font-bold ${accessibilityMode ? 'text-6xl text-white' : 'text-4xl text-green-600'}`}>
                    {enrolledCourses.length > 0 
                      ? Math.round(enrolledCourses.reduce((acc, c) => acc + c.progress, 0) / enrolledCourses.length)
                      : 0}%
                  </p>
                </CardContent>
              </Card>

              <Card className={accessibilityMode ? 'bg-black border-4 border-yellow-400' : 'bg-white/70 backdrop-blur-sm border-purple-100'}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${accessibilityMode ? 'text-3xl' : 'text-lg'}`}>
                    <Icon name="Award" className={accessibilityMode ? 'text-yellow-400' : 'text-purple-600'} size={accessibilityMode ? 32 : 20} />
                    <span className={accessibilityMode ? 'text-yellow-400' : ''}>Пройдено уроков</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`font-bold ${accessibilityMode ? 'text-6xl text-white' : 'text-4xl text-purple-600'}`}>
                    {enrolledCourses.reduce((acc, c) => acc + c.completedLessons, 0)}
                  </p>
                </CardContent>
              </Card>
            </div>

            <section>
              <h3 className={`font-bold mb-6 ${accessibilityMode ? 'text-5xl text-yellow-400' : 'text-2xl text-gray-800'}`}>Мои курсы</h3>
              {enrolledCourses.length === 0 ? (
                <Card className={`p-12 text-center ${accessibilityMode ? 'bg-black border-4 border-yellow-400' : 'bg-white/70 backdrop-blur-sm border-purple-100'}`}>
                  <Icon name="BookOpen" className={`mx-auto mb-4 ${accessibilityMode ? 'text-yellow-400' : 'text-gray-400'}`} size={accessibilityMode ? 64 : 48} />
                  <p className={`mb-4 ${accessibilityMode ? 'text-3xl text-white' : 'text-gray-600 text-lg'}`}>У вас пока нет активных курсов</p>
                  <Button 
                    onClick={() => setView('home')}
                    className={accessibilityMode ? 'bg-yellow-400 text-black hover:bg-yellow-500 text-2xl py-8 px-8 font-bold' : 'bg-gradient-to-r from-purple-600 to-green-600'}
                  >
                    Выбрать курс
                  </Button>
                </Card>
              ) : (
                <div className={`grid gap-6 ${accessibilityMode ? 'grid-cols-1' : 'grid-cols-1 lg:grid-cols-2'}`}>
                  {enrolledCourses.map((course, index) => (
                    <Card 
                      key={course.id} 
                      className={`transition-all duration-300 animate-fade-in ${accessibilityMode ? 'bg-black border-4 border-yellow-400' : 'hover:-translate-y-1 hover:shadow-xl bg-white/70 backdrop-blur-sm border-purple-100'}`}
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex gap-3">
                            <div className={`rounded-lg flex items-center justify-center flex-shrink-0 ${accessibilityMode ? 'w-20 h-20 bg-yellow-400' : 'w-12 h-12 bg-gradient-to-br from-purple-500 to-green-500'}`}>
                              <Icon name={course.icon as any} className={accessibilityMode ? 'text-black' : 'text-white'} size={accessibilityMode ? 40 : 24} />
                            </div>
                            <div>
                              <CardTitle className={accessibilityMode ? 'text-3xl text-yellow-400 mb-2' : 'text-xl mb-1'}>{course.title}</CardTitle>
                              <Badge variant="secondary" className={accessibilityMode ? 'bg-yellow-400 text-black text-xl px-4 py-2' : 'bg-purple-100 text-purple-700'}>
                                {course.category}
                              </Badge>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleUnenroll(course.id)}
                            className={accessibilityMode ? 'text-yellow-400 hover:bg-yellow-400 hover:text-black w-16 h-16' : 'text-gray-400 hover:text-red-600 hover:bg-red-50'}
                          >
                            <Icon name="X" size={accessibilityMode ? 32 : 20} />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <span className={`font-medium ${accessibilityMode ? 'text-2xl text-white' : 'text-sm text-gray-700'}`}>Прогресс</span>
                            <span className={`font-bold ${accessibilityMode ? 'text-4xl text-yellow-400' : 'text-2xl text-purple-600'}`}>{course.progress}%</span>
                          </div>
                          <Progress value={course.progress} className={accessibilityMode ? 'h-6' : 'h-3'} />
                        </div>
                        
                        <div className={`flex items-center justify-between ${accessibilityMode ? 'text-2xl text-white' : 'text-sm text-gray-600'}`}>
                          <div className="flex items-center gap-2">
                            <Icon name="CheckCircle2" size={accessibilityMode ? 24 : 16} className={accessibilityMode ? 'text-yellow-400' : 'text-green-600'} />
                            <span>{course.completedLessons} из {course.totalLessons} уроков</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Icon name="Clock" size={accessibilityMode ? 24 : 16} />
                            <span>{course.duration}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className={`w-full ${accessibilityMode ? 'bg-yellow-400 text-black hover:bg-yellow-500 text-2xl py-8 font-bold' : 'bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700'}`}>
                          <Icon name="PlayCircle" size={accessibilityMode ? 28 : 18} className="mr-2" />
                          Продолжить обучение
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </section>
          </div>
        ) : view === 'admin' ? (
          <div className="animate-fade-in">
            <section className="mb-12">
              <div className={`rounded-2xl p-8 ${accessibilityMode ? 'bg-black border-4 border-yellow-400' : 'bg-gradient-to-r from-purple-600 to-green-600 text-white'}`}>
                <h2 className={`font-bold mb-2 ${accessibilityMode ? 'text-6xl text-yellow-400' : 'text-4xl text-white'}`}>Админ-панель</h2>
                <p className={accessibilityMode ? 'text-3xl text-white' : 'text-purple-100'}>Управление учениками и их курсами</p>
              </div>
            </section>

            <div className={`grid gap-6 mb-12 ${accessibilityMode ? 'grid-cols-1' : 'grid-cols-1 md:grid-cols-4'}`}>
              <Card className={accessibilityMode ? 'bg-black border-4 border-yellow-400' : 'bg-white/70 backdrop-blur-sm border-purple-100'}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${accessibilityMode ? 'text-3xl' : 'text-lg'}`}>
                    <Icon name="Users" className={accessibilityMode ? 'text-yellow-400' : 'text-purple-600'} size={accessibilityMode ? 32 : 20} />
                    <span className={accessibilityMode ? 'text-yellow-400' : ''}>Всего учеников</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`font-bold ${accessibilityMode ? 'text-6xl text-white' : 'text-4xl text-purple-600'}`}>{students.length}</p>
                </CardContent>
              </Card>

              <Card className={accessibilityMode ? 'bg-black border-4 border-yellow-400' : 'bg-white/70 backdrop-blur-sm border-purple-100'}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${accessibilityMode ? 'text-3xl' : 'text-lg'}`}>
                    <Icon name="BookOpen" className={accessibilityMode ? 'text-yellow-400' : 'text-green-600'} size={accessibilityMode ? 32 : 20} />
                    <span className={accessibilityMode ? 'text-yellow-400' : ''}>Активных курсов</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`font-bold ${accessibilityMode ? 'text-6xl text-white' : 'text-4xl text-green-600'}`}>
                    {students.reduce((acc, s) => acc + s.enrolledCourses.length, 0)}
                  </p>
                </CardContent>
              </Card>

              <Card className={accessibilityMode ? 'bg-black border-4 border-yellow-400' : 'bg-white/70 backdrop-blur-sm border-purple-100'}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${accessibilityMode ? 'text-3xl' : 'text-lg'}`}>
                    <Icon name="TrendingUp" className={accessibilityMode ? 'text-yellow-400' : 'text-purple-600'} size={accessibilityMode ? 32 : 20} />
                    <span className={accessibilityMode ? 'text-yellow-400' : ''}>Средний прогресс</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`font-bold ${accessibilityMode ? 'text-6xl text-white' : 'text-4xl text-purple-600'}`}>
                    {Math.round(students.reduce((acc, s) => acc + s.totalProgress, 0) / students.length)}%
                  </p>
                </CardContent>
              </Card>

              <Card className={accessibilityMode ? 'bg-black border-4 border-yellow-400' : 'bg-white/70 backdrop-blur-sm border-purple-100'}>
                <CardHeader>
                  <CardTitle className={`flex items-center gap-2 ${accessibilityMode ? 'text-3xl' : 'text-lg'}`}>
                    <Icon name="Award" className={accessibilityMode ? 'text-yellow-400' : 'text-green-600'} size={accessibilityMode ? 32 : 20} />
                    <span className={accessibilityMode ? 'text-yellow-400' : ''}>Всего уроков</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`font-bold ${accessibilityMode ? 'text-6xl text-white' : 'text-4xl text-green-600'}`}>
                    {students.reduce((acc, s) => acc + s.enrolledCourses.reduce((a, c) => a + c.completedLessons, 0), 0)}
                  </p>
                </CardContent>
              </Card>
            </div>

            <section>
              <h3 className={`font-bold mb-6 ${accessibilityMode ? 'text-5xl text-yellow-400' : 'text-2xl text-gray-800'}`}>Ученики</h3>
              <div className="space-y-6">
                {students.map((student, index) => (
                  <Card 
                    key={student.id}
                    className={`transition-all duration-300 animate-fade-in ${accessibilityMode ? 'bg-black border-4 border-yellow-400' : 'hover:shadow-xl bg-white/70 backdrop-blur-sm border-purple-100'}`}
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between flex-wrap gap-4">
                        <div className="flex gap-4 items-center">
                          <div className={`rounded-full flex items-center justify-center flex-shrink-0 ${accessibilityMode ? 'w-20 h-20 bg-yellow-400' : 'w-16 h-16 bg-gradient-to-br from-purple-500 to-green-500'}`}>
                            <Icon name="User" className={accessibilityMode ? 'text-black' : 'text-white'} size={accessibilityMode ? 40 : 32} />
                          </div>
                          <div>
                            <CardTitle className={accessibilityMode ? 'text-3xl text-yellow-400 mb-2' : 'text-2xl mb-2'}>{student.name}</CardTitle>
                            <div className="flex flex-wrap gap-2 items-center">
                              <Badge variant="outline" className={`gap-1 ${accessibilityMode ? 'border-yellow-400 text-yellow-400 text-xl px-4 py-2' : ''}`}>
                                <Icon name="Mail" size={accessibilityMode ? 20 : 14} />
                                {student.email}
                              </Badge>
                              <Badge variant="outline" className={`gap-1 ${accessibilityMode ? 'border-yellow-400 text-yellow-400 text-xl px-4 py-2' : ''}`}>
                                <Icon name="Calendar" size={accessibilityMode ? 20 : 14} />
                                {student.joinDate}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold mb-1 ${accessibilityMode ? 'text-5xl text-yellow-400' : 'text-3xl text-purple-600'}`}>
                            {student.totalProgress}%
                          </div>
                          <p className={accessibilityMode ? 'text-xl text-white' : 'text-sm text-gray-600'}>Общий прогресс</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <h4 className={`font-semibold mb-4 ${accessibilityMode ? 'text-2xl text-yellow-400' : 'text-lg text-gray-800'}`}>
                        Курсы студента ({student.enrolledCourses.length})
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {student.enrolledCourses.map((course) => (
                          <div 
                            key={course.id} 
                            className={`p-4 rounded-lg ${accessibilityMode ? 'bg-gray-900 border-2 border-yellow-400' : 'bg-gradient-to-br from-purple-50 to-green-50'}`}
                          >
                            <div className="flex gap-3 mb-3">
                              <div className={`rounded-lg flex items-center justify-center flex-shrink-0 ${accessibilityMode ? 'w-12 h-12 bg-yellow-400' : 'w-10 h-10 bg-gradient-to-br from-purple-500 to-green-500'}`}>
                                <Icon name={course.icon as any} className={accessibilityMode ? 'text-black' : 'text-white'} size={accessibilityMode ? 24 : 20} />
                              </div>
                              <div className="flex-1">
                                <h5 className={`font-semibold mb-1 ${accessibilityMode ? 'text-xl text-yellow-400' : 'text-sm'}`}>{course.title}</h5>
                                <Badge variant="secondary" className={`text-xs ${accessibilityMode ? 'bg-yellow-400 text-black text-lg px-3 py-1' : 'bg-purple-100 text-purple-700'}`}>
                                  {course.category}
                                </Badge>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <span className={accessibilityMode ? 'text-xl text-white' : 'text-xs text-gray-600'}>Прогресс</span>
                                <span className={`font-bold ${accessibilityMode ? 'text-2xl text-yellow-400' : 'text-sm text-purple-600'}`}>{course.progress}%</span>
                              </div>
                              <Progress value={course.progress} className={accessibilityMode ? 'h-4' : 'h-2'} />
                              <div className={`flex items-center gap-1 ${accessibilityMode ? 'text-xl text-white' : 'text-xs text-gray-500'}`}>
                                <Icon name="CheckCircle2" size={accessibilityMode ? 20 : 12} className={accessibilityMode ? 'text-yellow-400' : 'text-green-600'} />
                                <span>{course.completedLessons}/{course.totalLessons} уроков</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        ) : null}
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